# Security Policy

## Supported Scope

This security policy applies to the current production version of the Deron public website and related web assets in this repository.

| Component | Supported |
|---|---|
| Production branch: `main` | ✅ |
| Current deployed website | ✅ |
| Archived branches | ❌ |
| Local development experiments | ❌ |

## Reporting a Vulnerability

If you discover a security vulnerability, please do **not** open a public GitHub issue.

Report it privately by email:

**ceo.deron@gmail.com**

Please include:

- A clear description of the vulnerability
- Steps to reproduce the issue
- Affected page, file, route, or feature
- Screenshots, logs, or proof-of-concept details if available
- Your contact information for follow-up

## Response Timeline

We aim to follow this process:

| Stage | Target |
|---|---|
| Initial acknowledgement | Within 72 hours |
| Triage and severity review | Within 7 days |
| Fix or mitigation plan | Based on severity |
| Public disclosure | Only after the issue is resolved |

## Security Principles

Deron follows a safety-first and human-first engineering approach.

For this repository, security priorities include:

- Protecting users and visitors
- Preventing unauthorized access
- Avoiding exposure of API keys, tokens, credentials, or private configuration
- Maintaining integrity of public-facing information
- Keeping deployment workflows clean and auditable

## Sensitive Information

Do not commit:

- API keys
- Access tokens
- Supabase service role keys
- GitHub tokens
- Passwords
- Private environment files
- Internal operational documents not intended for public release

Use `.env.example` for sample configuration only.

## Disclosure Policy

Please give us reasonable time to investigate and fix reported vulnerabilities before public disclosure.

We appreciate responsible security research and good-faith reporting.
