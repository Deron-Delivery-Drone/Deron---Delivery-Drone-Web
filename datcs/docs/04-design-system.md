# 04 — Design System (Command-Center)

## Design tone
- Calm, minimal, readable
- High signal-to-noise
- Explicit safety and authority cues

## Tokens
- Background: deep slate
- Panel: elevated neutral surfaces
- Text: high-contrast neutral ladder
- Safety colors:
  - Nominal: green
  - Advisory: amber
  - Warning: orange
  - Critical: red
  - Authority-locked: violet/indigo cue

## Typography
- Inter/system sans
- Dense-but-readable tables
- Monospace for IDs and timestamps

## Spacing and structure
- 8px base scale
- Persistent layout zones:
  - nav rail
  - work canvas
  - inspector

## Component patterns
- Mission state chips: Draft / Active / Paused / Degraded
- Authority badge: Level 0..3 + trust grade
- Alert cards: severity + source + required action
- Audit strip: who/when/device/reason

## Interaction rules
- Any safety-relevant action requires explicit confirmation context.
- Any blocked action explains the lock reason and authority path.
- Save/sync state always visible: Saved, Saving, Sync delayed, Conflict.
