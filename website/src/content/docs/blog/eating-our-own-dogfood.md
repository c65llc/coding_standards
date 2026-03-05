---
title: "Eating Our Own Dogfood: A Compliance Audit"
date: 2026-03-04
authors:
  - name: C65 LLC
---

A coding standards repo that doesn't follow its own standards is a bad look. We ran a compliance audit and fixed every gap we found.

## What We Found

Our standards require several things that the repo itself was missing:

- **proc-03 (Code Review)** requires a `CODEOWNERS` file — we didn't have one
- **sec-01 (Security)** requires dependency scanning — no `dependabot.yml`
- **proc-01 (Documentation)** requires an ADR directory and README per package — missing for `standards/`, `bin/`, and the ADR directory entirely
- **sec-01** defines a P0/P1/P2 severity model — but our PR template had no security checklist
- **Security standards** existed but weren't synced to the website or shown in the sidebar

## What We Fixed

**New files:**
- `.github/CODEOWNERS` — all paths default to `@c65llc`
- `.github/dependabot.yml` — weekly scans for npm (website) and GitHub Actions
- `docs/adr/0001-unified-standards-repository.md` — documents the foundational decision
- `standards/README.md` and `bin/README.md` — package-level documentation

**Modified files:**
- PR template now includes P0/P1/P2 security checkboxes
- Website sync script copies security standards with frontmatter injection
- Astro sidebar includes a Security section under Standards
- `CHANGELOG.md` restructured from one giant "Unreleased" block into proper versioned sections (0.1.0 through 0.5.0)

## The Blog, Too

While we were at it, we noticed the blog had exactly one post. A project that ships security frameworks, adds two languages, builds a CI-tested bootstrap system, and then audits itself for compliance has more than one thing to say. So we added four posts covering the release history.

## Takeaway

If you maintain standards, audit yourself first. It's the fastest way to find gaps in your own documentation — and it builds credibility with the teams you're asking to follow those standards.
