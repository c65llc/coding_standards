# Public Launch Design

**Date**: 2026-03-02
**Status**: Approved
**Author**: Donald Albrecht + Claude

## Summary

Make the coding_standards repository publicly available with collaboration features, improved documentation, and a static marketing website at `coding_standards.c65llc.com`.

## Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Target audience | All: individuals, teams, OSS maintainers | Broad appeal |
| Collaboration model | Issues-only + fork-friendly | Maintain control while enabling community feedback |
| License | MIT | Simplest, most recognized, corporate-friendly |
| Repo structure | Monorepo (website in `website/`) | Standards are the content; zero duplication |
| Website tech | Astro Starlight + GitHub Pages | Purpose-built for docs, free hosting, great DX |
| Domain | `coding_standards.c65llc.com` | Custom subdomain on existing domain |

---

## Section 1: Collaboration Infrastructure

### New files at repo root

- **LICENSE** — MIT, copyright C65 LLC
- **CODE_OF_CONDUCT.md** — Contributor Covenant v2.1
- **CONTRIBUTING.md** — Issues-only + fork-friendly model
  - How to file issues (bugs, feature requests, new language requests)
  - How to fork and customize for your org
  - Clarifies PRs are not currently accepted
- **SECURITY.md** — Responsible disclosure process (relevant for install.sh)

### GitHub configuration (`.github/`)

- **Issue templates** (`.github/ISSUE_TEMPLATE/`):
  - `bug_report.yml` — broken scripts, incorrect standards
  - `feature_request.yml` — new languages, agents, features
  - `config.yml` — links to discussions for general questions
- **GitHub Actions** (`.github/workflows/`):
  - `ci.yml` — ShellCheck on scripts, markdownlint on standards, build website
  - `deploy.yml` — Deploy Starlight to GitHub Pages on merge to `main`

---

## Section 2: Documentation Improvements

### Restructured `docs/` directory

```
docs/
├── getting-started/
│   ├── quick-start.md          # 5-minute setup
│   ├── installation.md         # All install methods
│   └── project-structure.md    # Repo organization
├── standards/                  # Rendered from standards/ directory
│   ├── architecture/
│   ├── languages/
│   └── process/
├── guides/
│   ├── multi-agent-setup.md    # Multi-agent configuration
│   ├── ci-cd-integration.md    # CI/CD integration
│   ├── customization.md        # NEW: fork and customize
│   └── cursor-commands.md      # NEW: .cursor/commands/ docs
├── reference/
│   ├── makefile-targets.md     # NEW: all Make targets
│   ├── scripts.md              # NEW: all scripts
│   └── agent-configs.md        # NEW: agent config formats
└── changelog.md
```

### Root README.md overhaul

- Badges (license, CI, stars)
- Compelling intro for first-time visitors
- Quick install snippet
- Feature highlights with doc links
- Supported AI Agents section
- Supported Languages section
- Link to full documentation site

---

## Section 3: Marketing Website

### Technology

- **Framework**: Astro Starlight
- **Hosting**: GitHub Pages
- **Domain**: `coding_standards.c65llc.com`
- **Build**: GitHub Actions on push to `main`

### Directory structure

```
website/
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── public/
│   ├── favicon.svg
│   ├── og-image.png
│   └── CNAME
└── src/
    ├── assets/
    ├── content/docs/          # Imports from ../../standards/ and ../../docs/
    ├── components/
    │   ├── Hero.astro
    │   ├── FeatureGrid.astro
    │   ├── AgentShowcase.astro
    │   ├── LanguageGrid.astro
    │   └── Testimonials.astro
    └── pages/
        └── index.astro        # Custom landing page
```

### Website pages

| Page | Purpose |
|------|---------|
| Landing (`/`) | Hero, value prop, install CTA, feature highlights, agent showcase, language grid |
| Docs (`/docs/`) | Full Starlight docs — getting started, standards, guides, reference |
| Blog (`/blog/`) | Announcements, AI development practices |
| Why this? (`/why/`) | Comparison vs alternatives, benefits of multi-agent approach |

### Landing page sections (top to bottom)

1. **Hero** — "One Standards Framework. Every AI Agent." + install command + CTA
2. **Problem/Solution** — "Your AI agents write inconsistent code" → "Unified standards fix that"
3. **Agent Showcase** — Cursor, Copilot, Claude/Aider, Codex, Gemini logos
4. **Language Grid** — 9 language icons
5. **Feature Highlights** — Multi-agent sync, Clean Architecture, One-command setup, Auto-updating
6. **How It Works** — 3-step: Install → Sync → Consistent code
7. **Testimonials** — Placeholder for future social proof
8. **CTA** — "Get started in 5 minutes" + install command

### Design aesthetic

- Dark mode default
- Clean, minimal
- Starlight built-in search, navigation, sidebar
- Custom landing page overrides Starlight splash
