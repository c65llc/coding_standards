# Integration Guide: Automating Cursor with Standards

This guide answers your three key questions about using, maintaining, and automating standards with Cursor AI.

## 1. Using Standards to Automate and Streamline Cursor

### How It Works

The `.cursorrules` file is Cursor's configuration that tells the AI:
- Which standards documents to reference
- How to apply them automatically
- What to check when reviewing code
- How to structure responses

### Automatic Application

Cursor automatically:
- ✅ Detects language and applies corresponding standards
- ✅ Checks architecture violations (Domain → Infrastructure dependencies)
- ✅ Validates naming conventions
- ✅ Enforces error handling patterns
- ✅ Verifies test coverage requirements
- ✅ Checks documentation completeness

### Interaction Modes

Use special commands from `02_cursor_automation_standards.md`:

- `@new-feature` - Scaffolds features following Clean Architecture
- `@refactor` - Applies SOLID principles automatically
- `@debug` - Systematic debugging approach
- `@review` - Architecture and quality audits

### Example Workflow

1. **You:** "Create a user authentication feature"
2. **Cursor:** Reads `02_cursor_automation_standards.md`, sees `@new-feature` pattern
3. **Cursor:** 
   - Creates Domain entity first
   - Defines Repository interface
   - Creates DTO in Application layer
   - Waits for approval before Infrastructure
4. **You:** "Add tests"
5. **Cursor:** Reads language-specific standards, adds tests following patterns

## 2. Maintaining and Sharing Standards via Git

### Repository Structure

```
standards-repo/
├── .cursorrules              # Cursor AI configuration
├── README.md                 # Overview and quick start
├── SETUP_GUIDE.md           # Detailed setup instructions
├── QUICK_START.md           # 5-minute setup guide
├── Makefile                 # Automation targets
├── setup.sh                 # Setup script
├── sync-standards.sh        # Sync script
├── 00-14_*.md              # All standards documents
└── .gitignore
```

### Git Workflow

#### For Standards Maintainers

```bash
# 1. Make changes to standards
git checkout -b feature/update-python-standards
# Edit files...

# 2. Commit with conventional format
git commit -m "docs(python): update pytest to 8.0+"

# 3. Tag releases
git tag -a v1.1.0 -m "Release 1.1.0"
git push origin main --tags
```

#### For Project Teams

```bash
# 1. Add as submodule
git submodule add <standards-repo-url> .standards

# 2. Setup
.standards/setup.sh

# 3. Commit
git add .standards .cursorrules .gitmodules
git commit -m "chore: add project standards"
```

### Sharing Strategies

**Option 1: Git Submodule (Recommended)**
- Single source of truth
- Version pinning support
- Easy updates across projects

**Option 2: Separate Repository**
- Clone into each project
- Manual updates
- Good for one-off projects

**Option 3: Organization Template**
- GitHub/GitLab template repository
- New projects start with standards
- Automatic inclusion

## 3. Automatically Updating Cursor When Standards Change

### Solution Overview

Three automation layers ensure Cursor always has the latest standards:

1. **Git Hooks** - Automatic detection
2. **Sync Scripts** - Manual/CI updates
3. **CI/CD Integration** - Automated checks

### Automation Methods

#### Method 1: Git Hooks (Automatic Detection)

The `setup.sh` script installs a `post-merge` hook:

```bash
# .git/hooks/post-merge (auto-installed)
#!/bin/bash
# Runs after git pull/merge
# Checks if .standards has updates
# Notifies user to run sync-standards.sh
```

**How it works:**
1. You run `git pull`
2. Hook automatically runs
3. Checks if standards submodule has updates
4. Notifies you if updates available

#### Method 2: Sync Script (Manual Update)

```bash
# Run manually or via cron
make sync-standards
# or
.standards/sync-standards.sh
```

**What it does:**
1. Pulls latest from standards repository
2. Updates `.cursorrules` if changed
3. Notifies you to restart Cursor

#### Method 3: CI/CD Integration (Automated)

Add to your CI pipeline:

```yaml
# .github/workflows/standards-check.yml
name: Check Standards

on: [push, pull_request]

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          submodules: true
      
      - name: Check standards are up to date
        run: make check-standards
```

**Benefits:**
- Fails PR if standards outdated
- Forces team to stay current
- Prevents drift

#### Method 4: Scheduled Updates (Optional)

```yaml
# .github/workflows/update-standards.yml
on:
  schedule:
    - cron: '0 0 * * 1'  # Weekly

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Update standards
        run: |
          cd .standards
          git pull origin main
          cd ..
          git add .standards
          git commit -m "chore: update standards" || exit 0
          git push
```

### Update Flow Diagram

```
Standards Repository (Updated)
         ↓
    git push
         ↓
Project Repositories
         ↓
Option A: Git Hook detects → Notifies user
Option B: CI/CD checks → Fails if outdated
Option C: Manual sync → make sync-standards
Option D: Scheduled → Auto-updates weekly
         ↓
.cursorrules updated
         ↓
Restart Cursor → New rules active
```

## Complete Setup Example

### Step 1: Initialize Standards Repository

```bash
# In standards repository
git init
git add .
git commit -m "docs: initial standards release"
git tag -a v1.0.0 -m "Initial release"
git remote add origin <your-repo-url>
git push -u origin main --tags
```

### Step 2: Use in Project

```bash
# In your project
git submodule add <standards-repo-url> .standards
.standards/setup.sh
# Restart Cursor
```

### Step 3: Daily Workflow

```bash
# Morning: Check for updates
make check-standards

# If outdated:
make sync-standards
# Restart Cursor

# Making changes: Cursor automatically uses standards
```

### Step 4: When Standards Update

```bash
# Standards maintainer pushes changes
# Your git hook detects (or CI fails)
# Run: make sync-standards
# Restart Cursor
# Continue working with updated standards
```

## Best Practices

### For Standards Maintainers

1. **Version Releases:** Tag major changes
2. **Breaking Changes:** Use semantic versioning
3. **Communication:** Notify team of updates
4. **Testing:** Test in sample project first

### For Project Teams

1. **Regular Syncs:** Weekly or after major updates
2. **Version Pinning:** Pin to specific versions for stability
3. **Custom Rules:** Extend, don't modify standards files
4. **Documentation:** Document project-specific deviations

### For CI/CD

1. **Check on PR:** Fail if standards outdated
2. **Auto-update:** Optional weekly updates
3. **Notifications:** Alert team of updates
4. **Rollback:** Support version pinning

## Troubleshooting

### Cursor Not Updating

**Problem:** Changes to standards not reflected in Cursor

**Solution:**
```bash
# 1. Verify .cursorrules updated
cat .cursorrules | head -20

# 2. Force update
make sync-standards

# 3. Restart Cursor completely (quit and reopen)
```

### Git Hook Not Working

**Problem:** Post-merge hook not detecting updates

**Solution:**
```bash
# Re-run setup
.standards/setup.sh

# Or manually install hook
cp .standards/setup.sh .git/hooks/post-merge
chmod +x .git/hooks/post-merge
```

### Submodule Issues

**Problem:** Submodule shows as modified

**Solution:**
```bash
# Check status
git submodule status

# Update to latest
cd .standards
git checkout main
git pull
cd ..
git add .standards
```

## Summary

✅ **Automation:** `.cursorrules` + standards files = automatic application  
✅ **Git Sharing:** Submodule + versioning = team-wide standards  
✅ **Auto-Updates:** Git hooks + CI/CD + sync scripts = always current  

The system is designed to be:
- **Automatic:** Works without manual intervention
- **Flexible:** Multiple integration options
- **Maintainable:** Clear update paths
- **Scalable:** Works for teams of any size

