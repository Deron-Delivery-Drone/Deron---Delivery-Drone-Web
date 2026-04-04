# Deron Main Avionics (DMA) — Complete Communication, Credential, and API Architecture

**Version:** 1.0 (production baseline)  
**Date:** 2026-04-04  
**Scope:** STM32H743 dual-FMU core + Safety/IO MCUs + Raspberry Pi 5 companion + 4G/5G + RTK/NTRIP + cloud telemetry/OTA  
**Classification:** Safety-critical system architecture

---

## 0) Non-Negotiable Safety & Separation Constraints

### 0.1 Safety invariants
1. **Aircraft remains fully flyable with no Internet, no SIM, no API key, no cloud account.**
2. **All flight-critical control loops execute only in Layer 1 hardware** (FMU-A/FMUB/Safety MCU/IO MCU/sensors/ESC path).
3. **Cloud and companion failures cannot remove manual or autonomous safety behavior** (RTH/land/hover/terminate as configured).

### 0.2 Layer separation (hard policy)
- **Layer 1 — Safety-critical, no API ever:** FMU-A, FMU-B, Safety MCU, IO MCU, IMU/baro/raw GNSS inputs, ESC CAN, global kill path.
- **Layer 2 — Mission enhancement:** Raspberry Pi 5, 4G/5G modem, NTRIP client.
- **Layer 3 — External services:** telemetry backend, fleet mgmt, OTA service, maps/weather.

**Rule:** Layer 1 consumes at most bounded, validated mission inputs from Layer 2; Layer 2/3 never own actuator authority.

---

## 1) Full Communication Architecture

## 1.1 End-to-end link map

```text
                           ┌──────────────────────────────────────────────┐
                           │                 LAYER 3 (Cloud)             │
                           │ Telemetry, Fleet, OTA, Maps, Weather, NTRIP │
                           └───────────────┬──────────────────────────────┘
                                           │ TLS/mTLS over 4G/5G
                                  ┌────────▼────────┐
                                  │   Pi 5 (Layer2) │
                                  │ router + client │
                                  └──┬─────────┬────┘
               UDP MAVLink (eth0)   │         │ UART2 (RTCM3)
                                     │         ▼
┌────────────────────────────────────▼──────────────────────────────────────┐
│                         DMA Core (Layer1 boundary)                        │
│  FMU-A ⇄ FMU-B (dual CAN-FD + heartbeat + vote)                           │
│    │      │                                                                │
│    ├──────┴─── Safety MCU (hard interlock, kill, watchdog)                │
│    ├────────── IO MCU (PWM/GPIO payload/noncritical IO abstraction)        │
│    ├────────── GNSS#1 (UART, UBX/NMEA/RTCM in)                             │
│    └────────── GNSS#2 (UART, UBX/NMEA/RTCM in) + PPS sync                  │
│  ESC network: CAN-FD deterministic motor bus                               │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 1.2 Per-link protocols and profiles

| Link | Physical | Protocol | Proposed profile | Ownership | External exposure |
|---|---|---|---|---|---|
| FMU-A ↔ FMU-B | Dual independent CAN-FD channels | Custom deterministic frame set + heartbeat + state digest | 2 Mbps data, 1 Mbps arbitration; 1 kHz heartbeat; monotonic counters | Layer 1 | None |
| FMU ↔ Safety MCU | CAN-FD primary + discrete GPIO kill/arm lines | Safety command/status frames | 500 Hz status + async fault frames; hardware watchdog | Layer 1 | None |
| FMU ↔ IO MCU | CAN-FD or SPI (board-dependent), prefer CAN-FD isolation | IO command/events | 100–200 Hz control, CRC16 per frame | Layer 1 | None |
| GNSS(F9P) ↔ FMU | UART + PPS | UBX/NMEA, RTCM3 ingest | 921600 baud preferred; fallback 460800 | Layer 1 | None |
| DMA ↔ Pi | Ethernet point-to-point | MAVLink2 over UDP + optional protobuf sidechannel | UDP/14550 ingress to Pi, UDP/14551 return; allowlist endpoints | Layer 1↔2 boundary | Local only |
| Pi ↔ Cloud telemetry | 4G/5G IP | MQTT over TLS1.3 (mTLS) | QoS1 telemetry, QoS1 commands (gated) | Layer 2/3 | Internet |
| Pi ↔ OTA backend | 4G/5G IP | HTTPS/TLS1.3 + signed artifacts | pull model, staged rollout | Layer 2/3 | Internet |
| Pi ↔ NTRIP caster | 4G/5G IP | NTRIP Rev1/Rev2 over TLS tunnel if supported | reconnect with backoff | Layer 2/3 | Internet |
| Pi ↔ Maps/Weather | 4G/5G IP | HTTPS/TLS1.3 REST | cache-once, bounded refresh | Layer 2/3 | Internet |

### 1.3 Internal vs external boundary control
- DMA–Pi Ethernet is **single-purpose subnet** (e.g., `172.20.0.0/30`), no bridging to Internet interface.
- Pi firewall policy:
  - default DROP inbound from WAN,
  - only established outbound TLS allowed,
  - only UDP MAVLink from DMA MAC/IP allowlisted.
- No direct Layer 3 route from cloud to FMU network.

## 1.4 Redundancy + failover timing

| Function | Primary | Backup | Failure detect | Failover action | Deadline |
|---|---|---|---|---|---|
| FMU compute | FMU-A active control | FMU-B hot standby / voting | missed heartbeat > 10 ms (10 cycles @1kHz) | transfer authority, retain last good state estimate | < 50 ms |
| FMU interconnect | CAN-FD bus A | CAN-FD bus B | CRC/sequence fault or silence > 5 ms | switch bus, raise degraded flag | < 20 ms |
| Position source | GNSS #1 RTK fix | GNSS #2 RTK/float/SPS | quality flag degrade > 1 s | source switch with hysteresis | < 2 s |
| RTK corrections | NTRIP stream | SPS/no-RTK | no RTCM > 3 s | mark RTK lost, continue nav | immediate mode drop |
| Cloud telemetry | 5G PDP context | store-and-forward local log | link down > 10 s | queue locally, no flight effect | N/A |
| Command uplink | authenticated cloud cmd | none (disabled when absent) | MQTT session loss > 5 s | commands unavailable, mission continues | N/A |

## 1.5 Latency budgets

| Path | Target one-way | Hard max | Notes |
|---|---:|---:|---|
| FMU-A ↔ FMU-B control sync | 1–2 ms | 5 ms | deterministic CAN-FD slotting |
| FMU ↔ Safety MCU fault reaction | < 2 ms | 10 ms | hardware kill line independent of bus |
| FMU ↔ ESC torque command | 2 ms | 8 ms | motor stability dependent |
| GNSS measurement to EKF ingest | 20 ms | 60 ms | includes parser + timestamp alignment |
| DMA ↔ Pi MAVLink telemetry | 10 ms | 50 ms | non-flight-critical data plane |
| Pi ↔ cloud telemetry | 100 ms | 1500 ms | mobile network variance tolerated |
| Cloud command to Pi verify | 150 ms | 3000 ms | command non-critical + timeout gated |

---

## 2) Credential / API / Auth Matrix

| Subsystem | Needs API key? | Needs SIM? | Needs account? | Type | Criticality | Fallback |
|---|---|---|---|---|---|---|
| 4G/5G modem | No API key | **Yes** | Carrier subscription | SIM/IMSI auth + APN | Mission-enhancement | offline operation, local logging |
| NTRIP RTK | No API key (typically) | Yes (via modem) | **Yes** (caster creds) | username/password + mountpoint | Mission-enhancement | GNSS float/SPS |
| Telemetry cloud | Usually token/mTLS cert | Yes | **Yes** | mTLS client cert + device JWT | Mission-enhancement | store-and-forward local |
| OTA system | Yes (service auth) | Yes | **Yes** | mTLS + signed manifest policy | Mission-enhancement impacting maintenance | defer update, continue running current image |
| Maps service | Yes (vendor key) | Yes | Usually yes | HTTPS API key | Advisory only | cached/offline geofence tiles |
| Weather service | Yes | Yes | Usually yes | HTTPS API key | Advisory only | onboard met assumptions, conservative ops |
| Debug access (remote) | No shared API key; cert-based | Yes (if remote) | Org IAM | short-lived mTLS bastion cert | Non-flight-critical, security-sensitive | local physical maintenance port only |
| Local logging | No | No | No | local filesystem + signed log chain | Safety-supporting evidence | ring buffer + retention policy |
| DMA↔Pi Ethernet link | No | No | No | local network ACL + message signing | Mission-enhancement ingress | FMU ignores companion input on fault |

**Policy assertion:** No credential/API/SIM is required for basic stabilization, navigation, failsafe, landing.

---

## 3) Security Architecture

## 3.1 Identity model
- **Hardware Root ID:** per-device immutable silicon ID (Pi TPM/secure element + FMU unique IDs for inventory only).
- **Drone ID:** fleet-assigned UUID (`drone_uuid`) mapped to hardware root at provisioning.
- **Module IDs:** `fmu_a_id`, `fmu_b_id`, `safety_mcu_id`, `io_mcu_id`, modem IMEI.
- **Binding:** signed provisioning record ties `drone_uuid` ↔ hardware fingerprints; verified by Pi before cloud session.

## 3.2 Credential storage rules
- **Credentials live on Pi only** (never on FMU/Safety/IO MCUs):
  - `/var/lib/deron/creds/` encrypted-at-rest.
- Use Linux dm-crypt/LUKS + TPM2 sealed key or secure-element-backed key unwrap.
- Runtime secrets in memory only for daemon process; cleared on restart.
- FMUs accept no cloud credentials and expose no secret-bearing API.

## 3.3 Key lifecycle and rotation
- Device mTLS cert validity: 90 days.
- Automatic renewal window: start at T-21 days, retry daily.
- Emergency revocation list fetched at boot + every 6h (best effort).
- NTRIP/password rotated quarterly or on incident.
- OTA signing keys offline root + online intermediate; rotate intermediate annually.

## 3.4 Transport security choices
- **Cloud telemetry/commands:** MQTT over TLS1.3 with mutual TLS.
- **OTA/maps/weather:** HTTPS/TLS1.3 with cert pinning for first-party domains.
- **NTRIP:** NTRIP over TLS tunnel when provider supports; otherwise isolate via APN/VPN.
- **DMA↔Pi local:** no TLS required on physically local link, but MAVLink2 signing + strict ACL and rate limits required.

## 3.5 Attack surface and mitigations

| Threat | Surface | Mitigation |
|---|---|---|
| Spoofing | forged telemetry/command packets | mTLS for cloud, MAVLink2 signing keys local-only, strict source IP/MAC ACL |
| Replay | captured valid commands | command nonce + monotonic sequence + short TTL (≤3 s) |
| MITM | mobile carrier/internet path | TLS1.3 + cert pinning + CRL/OCSP stapling policy |
| Command injection | malformed payloads to Pi/FMUs | schema validation, allowlist verbs, bounded parsing, watchdog timeouts |
| DoS/bandwidth exhaustion | WAN flood or local UDP spam | token-bucket rate limit, queue caps, backpressure, CPU cgroup limits |
| Privilege escalation on Pi | compromised service account | per-service least privilege, read-only rootfs option, seccomp/apparmor |
| Supply-chain OTA tamper | artifact replacement | signed manifests + signed binaries + measured boot hash check |

---

## 4) RTK / NTRIP Architecture

## 4.1 Connection flow
```text
F9P base networks / CORS  →  NTRIP Caster  →(Internet/4G)→  Pi NTRIP client
                                                     │
                                                     ▼
                                         RTCM3 over UART to GNSS modules
                                                     │
                                                     ▼
                                          GNSS fixes to FMU EKF pipeline
```

## 4.2 Credentials format
- Parameters: `caster_host`, `caster_port`, `mountpoint`, `username`, `password`, optional `ntrip_version`.
- Stored in Pi secret store; injected at service start via environment file with `0600` permissions.

## 4.3 Data path details
- Pi NTRIP daemon receives RTCM3 stream.
- Multiplex output to GNSS#1 and GNSS#2 UARTs (`/dev/ttyAMA2`, `/dev/ttyAMA3` example).
- UART to F9P at 460800 or 921600 baud, hardware flow control enabled.
- GNSS forwards corrected NAV solution to FMU via dedicated telemetry UART.

## 4.4 Failure handling thresholds
- **No RTCM packets for 3 s:** mark `RTK_STALE`.
- **No RTCM for 10 s:** downgrade to float/SPS mode and notify FMU via status flag.
- **NTRIP auth failure (401/403):** exponential backoff 5 s → 10 s → 20 s up to 5 min; continue SPS nav.
- **Caster unreachable 30 s:** raise mission advisory only (no flight-mode force except mission-specific policy).

---

## 5) 4G/5G System Design

## 5.1 Hardware integration
- Prefer **M.2 modem (USB 3.0 lane)** over external USB dongle for vibration robustness.
- Power budget: modem peak bursts 8–12 W; allocate dedicated 5V rail with margin and brownout protection.
- EMI controls:
  - physical separation from GNSS RF front-end,
  - shielded coax and grounded enclosure,
  - ferrites on power lines,
  - antenna diversity with proper isolation.

## 5.2 Linux software stack (Pi)
```text
[Modem firmware] -> [qmi_wwan/mbim driver] -> [ModemManager] -> [NetworkManager/systemd-networkd]
                                                   |
                                                   +-> wwan0 interface (IPv4/IPv6)
```

- Health daemon checks RSSI/RSRP/SINR, registration state, PDP session status.
- Connectivity state machine informs telemetry/NTRIP/OTA services.

## 5.3 SIM and carrier handling
- APN configured per fleet profile; fallback APN list supported.
- SIM PIN stored in secret manager; unlock attempted at boot.
- Roaming policy explicit (allowed/denied by mission region).
- Detect `SIM_EXPIRED`/`NO_CREDIT`/`BARRED` from modem cause codes and surface as maintenance alert.

## 5.4 Reconnect/failover strategy
- Link-loss detect: no default route or >80% ping loss to control endpoint for 10 s.
- Recovery stages:
  1. PDP reconnect,
  2. modem soft reset,
  3. radio detach/attach,
  4. full modem power cycle via controllable rail.
- Cooldown + jitter to avoid network storming.

---

## 6) Telemetry + Cloud Architecture

## 6.1 Data flow and authority boundaries
```text
FMU (state, health, mission progress) -> Pi ingest -> MQTT uplink -> Cloud
Cloud operator intent -> Command API -> MQTT downlink -> Pi command gate -> FMU (limited verbs)
```

**FMU accepted remote verbs (allowlist only):** mission upload/arm request/mode request/geofence update/RTL request.  
**Rejected remotely:** direct actuator commands, kill override without physical policy, firmware write while armed.

## 6.2 Protocol mix
- **FMU↔Pi:** MAVLink2 over UDP, signed.
- **Pi↔Cloud telemetry/commands:** MQTT/TLS1.3 (QoS1).
- **Operator streaming UI:** WebSocket from cloud backend to dashboard (not direct to aircraft).

## 6.3 Data classes and rates

| Data class | Direction | Nominal rate | Burst cap | Retention on loss |
|---|---|---:|---:|---|
| Core telemetry (attitude, pos, battery, mode) | Up | 5–10 Hz | 20 Hz | 24 h local queue |
| Health/events (faults, failsafes) | Up | event-driven | 50 events/min | 7 days summary |
| High-rate debug (opt-in) | Up | 20–50 Hz | throttled to 256 kbps | disabled by default |
| Commands | Down | event-driven | 10 cmds/min | TTL 3 s, discard stale |
| Logs/artifacts | Up | batch | 5 MB chunks | resume upload |

## 6.4 Bandwidth governance
- Global WAN cap per drone: e.g., 512 kbps sustained.
- Priority: health alerts > control acknowledgements > core telemetry > bulk logs > map/weather pulls.
- Drop policy under congestion: debug streams first.

---

## 7) OTA Update System

## 7.1 Updatable components
- **Pi software:** OS packages, containers/services, mission apps, modem config.
- **FMU firmware:** only through controlled maintenance state; never while armed or airborne.

## 7.2 Update flow
```text
Cloud release service -> signed manifest -> Pi updater -> verify signature/hash -> stage artifact
  -> (Pi app restart OR FMU maintenance flashing) -> post-update health checks -> commit/rollback flag
```

## 7.3 Safety controls
- Update preconditions for any component:
  - vehicle disarmed,
  - on ground (weight-on-gear / no movement confirmation),
  - battery > threshold or external power present.
- Dual-bank A/B partition on Pi with automatic rollback if health checks fail within N minutes.
- FMU update requires Safety MCU maintenance interlock + explicit local authorization token.
- Cryptographic checks: SHA-256 digest + signature (Ed25519 or ECDSA P-256).

---

## 8) Failure Mode Analysis (Detection, Timeout, Fallback)

| Subsystem | Failure case | Detection | Timeout | Fallback behavior |
|---|---|---|---|---|
| 4G/5G | Internet lost | route check + endpoint heartbeat fail | 10 s | continue mission; queue telemetry locally |
| 4G/5G | SIM expired/barred | modem cause code | immediate | no WAN services; maintenance alert |
| NTRIP | API/creds invalid | 401/403 from caster | immediate + backoff | GNSS float/SPS; keep flying |
| Telemetry cloud | server down | TLS connect failures / MQTT no CONNACK | 15 s | store-and-forward |
| OTA | key invalid/signature fail | signature verify failure | immediate | reject update, keep current image |
| Maps | API key invalid | HTTP 401/403 | immediate | use cached/offline maps |
| Weather | server/API fail | timeout/HTTP errors | 5 s per call | no weather refresh; conservative envelope |
| Remote debug | IAM/token fail | auth reject | immediate | disable remote shell; local maintenance only |
| DMA↔Pi Ethernet | link down | carrier loss + MAVLink heartbeat loss | 2 s | FMU ignores companion and proceeds autonomous failsafe policy |
| GNSS correction path | RTCM loss | no RTCM frame | 3 s stale / 10 s drop | RTK->float->SPS; adjust nav accuracy bounds |

---

## 9) Implementation Plan (Step-by-step)

## 9.1 Hardware steps
1. Wire dual CAN-FD between FMU-A/FMUB and Safety MCU (two physically separate buses).
2. Connect IO MCU on internal CAN-FD segment with gateway filtering.
3. Connect dual F9P UARTs to FMU; PPS lines to both FMUs for timestamp discipline.
4. Install Pi↔DMA dedicated Ethernet (direct or isolated switch VLAN).
5. Integrate M.2 5G modem on Pi carrier, dedicated power rail and RF antenna pair.
6. Add controllable power switch for modem reset and hardware watchdog line from Safety MCU (monitor-only).

## 9.2 Firmware hooks
- FMU:
  - MAVLink endpoint on Ethernet/UDP (read-only telemetry + limited command ingest).
  - Strict command allowlist and signed-message enforcement.
  - GNSS quality-state ingestion (`RTK_FIXED/RTK_FLOAT/SPS`).
- Safety MCU:
  - Hard kill/arm interlock independent of Pi.
  - Update-mode gate for FMU flashing.

## 9.3 Pi software stack (services/daemons)
- `deron-linkd`: MAVLink bridge, validation, rate limiting.
- `deron-telem`: MQTT uplink/downlink client with mTLS.
- `deron-ntripd`: NTRIP client + RTCM fanout to GNSS UARTs.
- `deron-updated`: OTA agent (manifest verify/stage/rollback).
- `deron-netmon`: modem health and reconnection state machine.
- `journald` + `deron-logship`: signed local logs + deferred upload.

## 9.4 Test & validation plan
1. **Network loss test:** disable modem antenna / block APN; verify flight unaffected, telemetry queued.
2. **Credential failure test:** inject invalid cloud cert/token; verify no remote command accepted, mission unaffected.
3. **NTRIP failure:** wrong password and caster blackout; confirm RTK degrade within thresholds and safe nav continuity.
4. **Replay attack test:** resend captured command packet; confirm nonce/TTL rejection.
5. **MITM test:** present untrusted cert; ensure TLS pinning rejection.
6. **OTA safety test:** attempt update while armed; verify hard rejection.
7. **FMU failover test:** force FMU-A reboot in flight simulation; confirm FMU-B takeover <50 ms.
8. **Ethernet cut test:** unplug DMA↔Pi; confirm FMU continues autonomous operation.

---

## 10) Final Consistency Check (Break-Test + Corrections)

### 10.1 Attempted break points
- Remove SIM/account/API keys entirely.
- Disable all cloud endpoints.
- Corrupt NTRIP credentials.
- Saturate WAN with junk traffic.
- Drop DMA↔Pi Ethernet.

### 10.2 Resulting safety posture
- Layer 1 remains operational for stabilization/navigation/failsafe.
- Layer 2 enhancements degrade gracefully with bounded effects.
- Layer 3 outages reduce visibility/precision only, not core flight safety.

### 10.3 Corrective hardening included in this baseline
1. Mandatory message signing on local MAVLink boundary.
2. No direct cloud-to-FMU route (Pi command gate required).
3. FMU firmware OTA only in maintenance-safe state.
4. Explicit timeout/fallback defined for every external dependency.
5. Credential isolation enforced to Pi encrypted store only.

---

## 11) Acceptance Criteria Checklist

- [x] No safety-critical path depends on Internet/API/SIM.
- [x] Every external interface has validation/timeouts/fallback.
- [x] Credentials isolated to Pi, never on FMU/Safety/IO MCUs.
- [x] Redundant compute and comm links with bounded failover times.
- [x] OTA constrained by flight-state interlocks and signed artifacts.
- [x] Failure mode behavior explicitly defined per subsystem.

