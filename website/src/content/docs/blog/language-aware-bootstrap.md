---
title: "Language-Aware Bootstrap for Claude Code"
date: 2026-03-03
authors:
  - name: C65 LLC
---

The setup script now detects your project's languages and generates a tailored Claude Code `settings.json` — no manual configuration needed.

## How It Works

When you run `setup.sh`, the bootstrap system:

1. **Scans your project** for language markers — `*.py`, `Gemfile`, `package.json`, `Cargo.toml`, `*.swift`, etc.
2. **Maps languages to tools** — Python projects get `ruff`, `pytest`, `mypy`; Ruby projects get `rubocop`, `rspec`, `brakeman`; TypeScript gets `eslint`, `vitest`, `tsc`.
3. **Generates `settings.json`** with the appropriate `allowedTools` configuration for Claude Code.

The result: Claude Code can run your project's linters, test runners, and formatters without you having to manually allowlist each tool.

## Template-Driven

The generation uses a base template with language-specific tool blocks injected dynamically. This means the core settings (permissions, MCP servers, etc.) stay consistent while tool access adapts to the project.

## CI Test Infrastructure

We added functional tests that validate the bootstrap pipeline:

- **Language detection tests** — verify that each file type maps to the correct language
- **Settings generation tests** — confirm the output JSON is valid and contains expected tool entries
- **Round-trip tests** — run setup on mock projects and validate the generated config

These run in CI on every PR that touches the setup scripts.

## Try It

Update your standards submodule and re-run setup:

```bash
cd .standards && git pull origin main && cd ..
make setup
```

Your `settings.json` will be regenerated with language-appropriate tooling.
