# Public Launch Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the coding_standards repository publicly available with collaboration infrastructure, restructured documentation, and a full marketing website at `coding_standards.c65llc.com`.

**Architecture:** Monorepo approach — website lives in `website/` using Astro Starlight, docs restructured under `docs/`, collaboration files at repo root. GitHub Actions handles CI and deployment.

**Tech Stack:** Astro Starlight, GitHub Pages, GitHub Actions, ShellCheck, markdownlint

---

## Phase 1: Collaboration Infrastructure

### Task 1: Add MIT License

**Files:**

- Create: `LICENSE`

**Step 1: Create LICENSE file**

```text
MIT License

Copyright (c) 2026 C65 LLC

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

**Step 2: Commit**

```bash
git add LICENSE
git commit -m "chore: add MIT license"
```

---

### Task 2: Add Code of Conduct

**Files:**

- Create: `CODE_OF_CONDUCT.md`

**Step 1: Create CODE_OF_CONDUCT.md**

Use Contributor Covenant v2.1 (full standard text). Set contact method to GitHub Issues. Replace `[INSERT CONTACT METHOD]` with a link to the repo's issues page.

**Step 2: Commit**

```bash
git add CODE_OF_CONDUCT.md
git commit -m "chore: add Contributor Covenant code of conduct"
```

---

### Task 3: Add CONTRIBUTING.md

**Files:**

- Create: `CONTRIBUTING.md`

**Step 1: Create CONTRIBUTING.md**

Structure:

- Welcome section explaining the project
- **Reporting Issues** — how to file bugs and feature requests via GitHub Issues
- **Requesting New Languages/Agents** — use feature request template
- **Forking and Customizing** — step-by-step guide to fork, customize standards for your org, and maintain your fork
- **Why We Don't Accept PRs (Yet)** — brief explanation that the project is new and the team wants to stabilize before opening contributions
- **Questions and Discussion** — point to GitHub Issues for now

Keep it concise — under 100 lines.

**Step 2: Commit**

```bash
git add CONTRIBUTING.md
git commit -m "docs: add contributing guide (issues-only + fork-friendly)"
```

---

### Task 4: Add SECURITY.md

**Files:**

- Create: `SECURITY.md`

**Step 1: Create SECURITY.md**

Structure:

- **Reporting a Vulnerability** — email address or private GitHub security advisory
- **Scope** — what counts as a security issue (install.sh running arbitrary code, script injection in setup scripts)
- **Response Timeline** — commit to acknowledging within 48 hours

Note: This is important because `install.sh` uses `curl | bash` pattern.

**Step 2: Commit**

```bash
git add SECURITY.md
git commit -m "docs: add security policy"
```

---

### Task 5: Add GitHub Issue Templates

**Files:**

- Create: `.github/ISSUE_TEMPLATE/bug_report.yml`
- Create: `.github/ISSUE_TEMPLATE/feature_request.yml`
- Create: `.github/ISSUE_TEMPLATE/config.yml`

**Step 1: Create bug report template**

Create `.github/ISSUE_TEMPLATE/bug_report.yml` as a YAML form template with fields:

- **Description** (textarea, required) — what happened
- **Expected behavior** (textarea, required) — what should have happened
- **Steps to reproduce** (textarea, required)
- **Environment** (dropdown) — OS, shell, AI agent being used
- **Standards version** (input) — git tag or commit hash
- **Logs** (textarea, optional) — any error output

**Step 2: Create feature request template**

Create `.github/ISSUE_TEMPLATE/feature_request.yml` with fields:

- **Type** (dropdown, required) — New language, New AI agent, Script improvement, Documentation, Other
- **Description** (textarea, required) — what you'd like
- **Use case** (textarea, required) — why this would be useful
- **Alternatives considered** (textarea, optional)

**Step 3: Create config.yml**

Create `.github/ISSUE_TEMPLATE/config.yml`:

```yaml
blank_issues_enabled: false
contact_links:
  - name: Documentation
    url: https://coding_standards.c65llc.com/docs/
    about: Check the documentation before opening an issue
```

**Step 4: Commit**

```bash
git add .github/ISSUE_TEMPLATE/
git commit -m "chore: add GitHub issue templates"
```

---

### Task 6: Add CI GitHub Action

**Files:**

- Create: `.github/workflows/ci.yml`

**Step 1: Create CI workflow**

Create `.github/workflows/ci.yml` that triggers on push to `main` and on PRs:

Jobs:

1. **shellcheck** — runs `shellcheck` on all `.sh` files in `scripts/`
2. **markdown-lint** — runs `markdownlint` on all `.md` files in `standards/` and `docs/`
3. **build-website** — `cd website && npm ci && npm run build` (only runs if `website/` exists)

Use latest Ubuntu runner. Pin action versions.

**Step 2: Commit**

```bash
git add .github/workflows/ci.yml
git commit -m "ci: add shellcheck, markdownlint, and website build checks"
```

---

### Task 7: Add GitHub Pages Deploy Action

**Files:**

- Create: `.github/workflows/deploy.yml`

**Step 1: Create deploy workflow**

Create `.github/workflows/deploy.yml` that triggers on push to `main` (only when `website/` files change):

Jobs:

1. **build** — `cd website && npm ci && npm run build`
2. **deploy** — uses `actions/deploy-pages@v4` to deploy `website/dist/`

Set permissions for `pages: write`, `id-token: write`. Use `actions/configure-pages`, `actions/upload-pages-artifact`, `actions/deploy-pages`.

**Step 2: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: add GitHub Pages deployment workflow"
```

---

## Phase 2: Documentation Restructuring

### Task 8: Restructure docs directory

**Files:**

- Create: `docs/getting-started/` directory
- Move: `docs/QUICK_START.md` → `docs/getting-started/quick-start.md` (revise)
- Move: `docs/SETUP_GUIDE.md` → `docs/getting-started/installation.md` (revise)
- Create: `docs/getting-started/project-structure.md` (from `STRUCTURE.md` content)
- Create: `docs/guides/` directory
- Move: `docs/MULTI_AGENT_GUIDE.md` → `docs/guides/multi-agent-setup.md` (revise)
- Move: `docs/INTEGRATION_GUIDE.md` → `docs/guides/ci-cd-integration.md` (revise)
- Create: `docs/guides/customization.md` (NEW)
- Create: `docs/guides/cursor-commands.md` (NEW)
- Create: `docs/reference/` directory
- Create: `docs/reference/makefile-targets.md` (NEW)
- Create: `docs/reference/scripts.md` (NEW)
- Create: `docs/reference/agent-configs.md` (NEW)

**Step 1: Create new directory structure**

```bash
mkdir -p docs/getting-started docs/guides docs/reference
```

**Step 2: Move and revise getting-started docs**

Move existing docs to new locations. Revise each to:

- Remove internal jargon, write for first-time visitors
- Add clear prerequisites
- Ensure all paths and links are updated
- Add frontmatter for Starlight (title, description)

**Step 3: Move and revise guide docs**

Move MULTI_AGENT_GUIDE.md and INTEGRATION_GUIDE.md. Add Starlight frontmatter.

**Step 4: Create new customization guide**

Write `docs/guides/customization.md`:

- How to fork the repo
- Which files to customize (standards/, .cursorrules, agent configs)
- How to keep your fork updated from upstream
- How to distribute your customized standards to your team

**Step 5: Create new Cursor commands guide**

Write `docs/guides/cursor-commands.md`:

- Document each command in `.cursor/commands/` (pr.md, review.md, address_feedback.md)
- Explain how to use them in Cursor
- Show example workflows

**Step 6: Create reference docs**

Write three reference files:

- `docs/reference/makefile-targets.md` — document every Make target from the Makefile
- `docs/reference/scripts.md` — document every script in `scripts/` with usage, flags, examples
- `docs/reference/agent-configs.md` — explain each agent config format (.cursorrules, copilot-instructions.md, .aiderrc, .codexrc, GEMINI.md)

**Step 7: Clean up old doc locations**

Remove the old files (QUICK_START.md, SETUP_GUIDE.md, etc.) from their original locations. Update `docs/README.md` or remove it if redundant. Move `CHANGELOG.md` content to `docs/changelog.md`.

**Step 8: Commit**

```bash
git add docs/ STRUCTURE.md CHANGELOG.md
git commit -m "docs: restructure documentation for public launch"
```

---

### Task 9: Overhaul root README.md

**Files:**

- Modify: `README.md`

**Step 1: Rewrite README.md**

New structure:

1. **Title + badges** — project name, MIT license badge, CI badge, GitHub stars badge
2. **One-line description** — "Unified coding standards for every AI coding assistant."
3. **Hero paragraph** — 2-3 sentences: what it does, why it matters, who it's for
4. **Quick install** — the curl one-liner
5. **What you get** — bullet list of what the installer sets up
6. **Supported AI Agents** — table or grid: Cursor, Copilot, Claude/Aider, Codex, Gemini with check marks
7. **Supported Languages** — table: Python, Java, Kotlin, Swift, Dart, TypeScript, JavaScript, Rust, Zig
8. **Feature Highlights** — 3-4 key features with brief descriptions
9. **Documentation** — links to the Starlight site sections
10. **Contributing** — brief note + link to CONTRIBUTING.md
11. **License** — MIT + link to LICENSE

Remove: the old detailed sections (manual installation details, maintenance instructions, etc.). Those now live in the docs site.

**Step 2: Commit**

```bash
git add README.md
git commit -m "docs: overhaul README for public launch"
```

---

## Phase 3: Marketing Website

### Task 10: Scaffold Astro Starlight project

**Files:**

- Create: `website/package.json`
- Create: `website/astro.config.mjs`
- Create: `website/tsconfig.json`
- Create: `website/public/CNAME`
- Create: `website/public/favicon.svg`
- Create: `website/src/content/docs/index.mdx` (Starlight entry)

**Step 1: Initialize Starlight project**

```bash
cd website
npm create astro@latest -- --template starlight --yes
```

If the interactive installer doesn't work non-interactively, manually create the files:

- `package.json` with `astro`, `@astrojs/starlight` dependencies
- `astro.config.mjs` with Starlight plugin configured
- `tsconfig.json` extending Astro's config

**Step 2: Configure Starlight**

Edit `website/astro.config.mjs`:

- Set `site` to `https://coding_standards.c65llc.com`
- Set `title` to `Coding Standards`
- Configure sidebar to match the docs structure:
  - Getting Started (quick-start, installation, project-structure)
  - Standards → Architecture, Languages, Process
  - Guides (multi-agent, ci-cd, customization, cursor-commands)
  - Reference (makefile-targets, scripts, agent-configs)
- Enable search
- Set default color mode to dark

**Step 3: Add CNAME**

Create `website/public/CNAME` with content `coding_standards.c65llc.com`

**Step 4: Create favicon**

Create a simple SVG favicon for `website/public/favicon.svg`.

**Step 5: Verify it builds**

```bash
cd website && npm install && npm run build
```

Expected: Build succeeds, output in `website/dist/`

**Step 6: Commit**

```bash
git add website/
git commit -m "feat: scaffold Astro Starlight website"
```

---

### Task 11: Wire docs content into Starlight

**Files:**

- Create/modify: `website/src/content/docs/` structure
- Modify: `website/astro.config.mjs` (if needed for content collections)

**Step 1: Set up content symlinks or copies**

Starlight expects content in `src/content/docs/`. Two approaches:

- **Option A (symlinks):** Symlink `../../docs/getting-started/` etc. into `src/content/docs/`
- **Option B (build script):** Add a prebuild script that copies docs and standards into `src/content/docs/`

Use Option B (build script) — symlinks can be fragile in CI. Create a `website/scripts/sync-content.sh` that:

1. Copies `docs/getting-started/`, `docs/guides/`, `docs/reference/` into `website/src/content/docs/`
2. Copies `standards/architecture/`, `standards/languages/`, `standards/process/` into `website/src/content/docs/standards/`
3. Adds Starlight frontmatter to any files missing it

Update `package.json` scripts:

```json
"prebuild": "bash scripts/sync-content.sh",
"predev": "bash scripts/sync-content.sh"
```

**Step 2: Update sidebar config**

Update `website/astro.config.mjs` sidebar to reference the copied content paths.

**Step 3: Verify build**

```bash
cd website && npm run build
```

Expected: All docs pages render correctly.

**Step 4: Commit**

```bash
git add website/
git commit -m "feat: wire documentation content into Starlight"
```

---

### Task 12: Build custom landing page

**Files:**

- Create: `website/src/pages/index.astro`
- Create: `website/src/components/Hero.astro`
- Create: `website/src/components/FeatureGrid.astro`
- Create: `website/src/components/AgentShowcase.astro`
- Create: `website/src/components/LanguageGrid.astro`
- Create: `website/src/components/HowItWorks.astro`

**Step 1: Create landing page layout**

Create `website/src/pages/index.astro` that imports Starlight's base layout but overrides the content area with a custom landing page. Sections in order:

1. **Hero** — "One Standards Framework. Every AI Agent." + code block with install command + "Get Started" CTA button linking to `/docs/getting-started/quick-start/`
2. **Problem/Solution** — Two-column: left shows the problem (inconsistent AI-generated code), right shows the solution (unified standards)
3. **Agent Showcase** — Grid of supported AI agents with names and brief "how it works" text
4. **Language Grid** — 3x3 grid of the 9 supported languages
5. **Feature Highlights** — 4 cards: Multi-agent sync, Clean Architecture, One-command setup, Auto-updating
6. **How It Works** — 3 numbered steps: Install → Standards sync → Consistent code
7. **CTA** — "Get started in 5 minutes" + install command + button

Use the `frontend-design` skill for this step to ensure high design quality.

**Step 2: Build each component**

Create each `.astro` component with:

- Scoped CSS (no external CSS framework needed — keep it light)
- Dark mode as default, with light mode support via Starlight's theme toggle
- Responsive design (mobile-first)
- Semantic HTML

**Step 3: Verify build and visual check**

```bash
cd website && npm run dev
```

Open in browser, check all sections render. Check mobile responsive.

**Step 4: Commit**

```bash
git add website/src/
git commit -m "feat: add custom landing page with all sections"
```

---

### Task 13: Add blog support

**Files:**

- Modify: `website/astro.config.mjs`
- Modify: `website/package.json` (add blog plugin if needed)
- Create: `website/src/content/docs/blog/` directory
- Create: `website/src/content/docs/blog/welcome.md` (first post)

**Step 1: Enable Starlight blog**

Install `starlight-blog` plugin:

```bash
cd website && npm install starlight-blog
```

Add to `astro.config.mjs` plugins.

**Step 2: Create welcome blog post**

Write `welcome.md`:

- Title: "Introducing Coding Standards: One Framework, Every AI Agent"
- Announce the public launch
- Explain the problem and solution
- Highlight key features
- Call to action: try it, file issues, fork it

**Step 3: Verify build**

```bash
cd website && npm run build
```

**Step 4: Commit**

```bash
git add website/
git commit -m "feat: add blog with welcome post"
```

---

### Task 14: Add "Why This?" comparison page

**Files:**

- Create: `website/src/content/docs/why.md`

**Step 1: Write comparison page**

Structure:

- **The Problem** — Teams use multiple AI agents, each generates code differently
- **The Old Way** — Maintain separate configs per agent, standards drift, no single source of truth
- **The New Way** — One standards repo, auto-synced to every agent
- **Comparison Table** — This project vs. ad-hoc standards vs. no standards
- **Key Benefits** — Multi-agent consistency, Clean Architecture enforcement, language-specific best practices, automated setup

**Step 2: Commit**

```bash
git add website/src/content/docs/why.md
git commit -m "docs: add 'Why This?' comparison page"
```

---

### Task 15: Add OG image and meta tags

**Files:**

- Create: `website/public/og-image.png`
- Modify: `website/astro.config.mjs` (social/head config)

**Step 1: Create OG image**

Create a 1200x630 PNG for social sharing. Can be a simple branded image with the project name and tagline. Use a build-time generation approach or a static image.

**Step 2: Configure meta tags**

Update `astro.config.mjs` to include:

- `head` entries for og:image, og:title, og:description, twitter:card
- Set `social` links (GitHub repo URL)

**Step 3: Commit**

```bash
git add website/public/og-image.png website/astro.config.mjs
git commit -m "feat: add OG image and social meta tags"
```

---

## Phase 4: Final Polish

### Task 16: Update .gitignore for website

**Files:**

- Modify: `.gitignore`

**Step 1: Add website build artifacts to .gitignore**

Add:

```text
# Website
website/node_modules/
website/dist/
website/.astro/
website/src/content/docs/standards/
website/src/content/docs/getting-started/
website/src/content/docs/guides/
website/src/content/docs/reference/
```

The last 4 entries are the synced content — generated at build time, shouldn't be committed.

**Step 2: Commit**

```bash
git add .gitignore
git commit -m "chore: update .gitignore for website build artifacts"
```

---

### Task 17: Update Makefile with website targets

**Files:**

- Modify: `Makefile`

**Step 1: Add website targets**

Add to the existing Makefile:

```makefile
website-dev: ## Start the website dev server
	@cd website && npm run dev

website-build: ## Build the website for production
	@cd website && npm run build

website-preview: ## Preview the production build locally
	@cd website && npm run preview
```

Update the `.PHONY` line to include the new targets.

**Step 2: Commit**

```bash
git add Makefile
git commit -m "chore: add website make targets"
```

---

### Task 18: End-to-end verification

**Step 1: Verify full website build**

```bash
cd website && npm ci && npm run build
```

Expected: Clean build, no errors, all pages generated.

**Step 2: Verify CI workflow locally (optional)**

```bash
# ShellCheck
shellcheck scripts/*.sh

# Markdown lint (if markdownlint-cli installed)
markdownlint 'standards/**/*.md' 'docs/**/*.md'
```

**Step 3: Test install script still works**

```bash
# In a temp directory
mkdir /tmp/test-install && cd /tmp/test-install && git init
# Run install.sh against the local repo to verify it still works
```

**Step 4: Visual check**

```bash
cd website && npm run dev
```

Open browser and verify:

- Landing page renders all sections
- Docs sidebar navigates correctly
- All standards pages render
- Blog page works
- Search works
- Dark/light mode toggle works
- Mobile responsive

**Step 5: Final commit if any fixes needed**

---

### Task 19: Configure DNS and enable GitHub Pages

**Step 1: DNS setup**

Add a CNAME record for `coding_standards.c65llc.com` pointing to `c65llc.github.io` in your DNS provider.

**Step 2: Enable GitHub Pages**

In the repo settings on GitHub:

- Go to Settings → Pages
- Source: GitHub Actions
- Custom domain: `coding_standards.c65llc.com`
- Enforce HTTPS: enabled

**Step 3: Verify deployment**

Push to `main` and verify the deploy workflow runs. Check `coding_standards.c65llc.com` loads.

---

## Task Summary

| # | Task | Phase | Est. |
|---|------|-------|------|
| 1 | Add MIT License | Collaboration | 2 min |
| 2 | Add Code of Conduct | Collaboration | 2 min |
| 3 | Add CONTRIBUTING.md | Collaboration | 5 min |
| 4 | Add SECURITY.md | Collaboration | 3 min |
| 5 | Add GitHub Issue Templates | Collaboration | 5 min |
| 6 | Add CI GitHub Action | Collaboration | 5 min |
| 7 | Add Deploy GitHub Action | Collaboration | 5 min |
| 8 | Restructure docs directory | Documentation | 30 min |
| 9 | Overhaul root README.md | Documentation | 15 min |
| 10 | Scaffold Astro Starlight | Website | 10 min |
| 11 | Wire docs into Starlight | Website | 15 min |
| 12 | Build custom landing page | Website | 30 min |
| 13 | Add blog support | Website | 10 min |
| 14 | Add "Why This?" page | Website | 10 min |
| 15 | Add OG image and meta tags | Website | 5 min |
| 16 | Update .gitignore | Polish | 2 min |
| 17 | Update Makefile | Polish | 3 min |
| 18 | End-to-end verification | Polish | 15 min |
| 19 | Configure DNS + GitHub Pages | Polish | 10 min |

**Dependencies:**

- Tasks 1-7 can be done in parallel (no dependencies)
- Task 8 must complete before Task 11 (docs need to exist before wiring into Starlight)
- Task 10 must complete before Tasks 11-15
- Task 16-17 can be done anytime
- Task 18 requires all prior tasks complete
- Task 19 requires Task 18 (final verification first)
