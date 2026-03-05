---
title: "P0-P2 Security Standards: Severity-Driven Code Review"
date: 2026-03-03
authors:
  - name: C65 LLC
---

We've added a comprehensive security standards framework to Coding Standards, built around a severity model that makes security findings actionable in code review.

## The P0-P2 Model

Not all security issues are equal. Our framework assigns every rule a severity level:

- **P0 (Critical)** — SQL injection, command injection, hardcoded secrets. These **block merge immediately**.
- **P1 (High)** — Missing auth checks, insecure deserialization, XSS. Also **merge-blocking**.
- **P2 (Medium)** — Missing rate limiting, verbose error messages, weak TLS config. Flagged as **warnings**.

This gives reviewers a clear decision framework: P0/P1 means "stop and fix," P2 means "track and address."

## Eight Security Categories

The standard covers eight areas:

1. **Injection Prevention** — SQL, command, XSS, SSRF, template injection
2. **Authentication & Authorization** — session management, access control
3. **Secrets Management** — hardcoded credential detection, vault usage
4. **Dangerous Functions** — `eval()`, `exec()`, insecure deserialization
5. **Dependency Security** — CVE scanning, lock files, supply chain
6. **Configuration Security** — TLS, security headers, debug mode
7. **Data Protection** — PII in logs, encryption at rest/in transit
8. **SAST Tooling** — per-language static analysis and dependency scanning

## Language-Specific Tooling

Every language standard now includes a security section with recommended SAST tools. For example:

| Language | SAST | Dependency Scanner |
|----------|------|--------------------|
| Python | Bandit, Semgrep | pip-audit, Safety |
| Ruby | Brakeman | bundler-audit |
| TypeScript | ESLint security plugins | npm audit |
| Rust | cargo-audit | cargo-deny |

## Integrated Everywhere

Security rules are baked into every AI agent config — Cursor, Copilot, Claude Code, Codex, and Gemini all reference the same P0-P2 model. The code review standard (`proc-03`) includes a security checklist, and the PR template now has P0/P1/P2 checkboxes.

See the full standard at [sec-01: Security Standards](/standards/security/sec-01_security_standards/).
