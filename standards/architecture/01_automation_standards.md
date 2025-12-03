# Document 2: Automation & Workflows

**Filename:** `01_automation_standards.md`

> **Usage:** This rules file instructs the AI to always check for or generate a `Makefile` that wraps the underlying tech stack (npm, pip, cargo, etc).

```markdown
# Automation Standards

## 1. Meta-Automation Tool
* **Standard:** `GNU Make` is the single entry point for all project tasks.
* **Abstraction:** The `Makefile` must wrap underlying package managers (npm, poetry, cargo). Do not run language-specific commands directly in CI/CD or local dev.

## 2. Required Make Targets
Every project MUST include the following targets in the root `Makefile`:

### `make dev`
* **Goal:** Setup stable local development environment.
* **Requirement:** Must provision containers (Docker Compose) or strict virtual environments.
* **Post-condition:** System is ready for coding immediately after execution.

### `make test`
* **Goal:** Verify code integrity.
* **Action:** Runs all unit and integration tests.

### `make lint`
* **Goal:** Static analysis.
* **Action:** Runs linters (ESLint, Pylint, Ruff) and type checkers.

### `make build`
* **Goal:** Compile/Prepare assets.
* **Action:** Produces executable artifacts or optimized bundles (dist/ folder).

### `make run`
* **Goal:** Execute the project.
* **Action:** Stands up the application locally (e.g., `docker-compose up` or `uvicorn`).

### `make fmt`
* **Goal:** Standardize code style.
* **Action:** Auto-formats code (Prettier, Black, Rustfmt) across the entire repo.

### `make repo-setup`
* **Goal:** Initialize version control.
* **Action:** Configures git hooks (pre-commit), submodules, and local git settings.

## 3. Implementation Guidelines
* **Phony Targets:** Always declare `.PHONY` for all commands.
* **Help:** Include a `help` target that lists commands and descriptions (default target).
* **Idempotency:** Commands should be safe to run multiple times without side effects.
