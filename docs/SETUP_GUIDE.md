# Setup Guide: Using Standards with Cursor AI

This guide explains how to set up and maintain the project standards for use with Cursor AI.

## Table of Contents

1. [Initial Setup](#initial-setup)
2. [Maintaining Standards in Git](#maintaining-standards-in-git)
3. [Automating Updates](#automating-updates)
4. [Team Collaboration](#team-collaboration)
5. [Troubleshooting](#troubleshooting)

## Initial Setup

### Option 1: Git Submodule (Recommended for Teams)

Best for teams sharing standards across multiple projects.

#### Step 1: Add Standards as Submodule

```bash
# In your project root
git submodule add https://github.com/c65llc/coding_standards.git .standards
git submodule update --init --recursive
```

#### Step 2: Run Setup Script

```bash
cd .standards
./setup.sh
```

This will:
- Copy `.cursorrules` to your project root
- Set up git hooks for auto-sync
- Configure project settings

#### Step 3: Commit Changes

```bash
git add .cursorrules .gitmodules
git commit -m "chore: add project standards submodule"
```

### Option 2: Direct Copy (Single Project)

Best for individual projects or when you want full control.

#### Step 1: Clone Standards Repository

```bash
git clone https://github.com/c65llc/coding_standards.git .standards
```

#### Step 2: Copy .cursorrules

```bash
cp .standards/.cursorrules .cursorrules
```

#### Step 3: Add to .gitignore (Optional)

If you don't want to commit `.cursorrules`:

```bash
echo ".cursorrules" >> .gitignore
```

### Option 3: Symlink (Local Development)

Best for local development when standards are in a fixed location.

```bash
ln -s /path/to/standards/.cursorrules .cursorrules
```

## Maintaining Standards in Git

### Repository Structure

```
standards-repo/
├── .cursorrules              # Cursor configuration
├── README.md                 # Documentation
├── setup.sh                 # Setup script
├── sync-standards.sh         # Sync script
├── 00_project_standards_and_architecture.md
├── 01_automation_standards.md
├── ... (all standards files)
└── .gitignore
```

### Making Changes to Standards

1. **Create feature branch:**
   ```bash
   git checkout -b feature/update-python-standards
   ```

2. **Make changes** to standards files

3. **Update .cursorrules** if you added new standards files

4. **Commit with conventional format:**
   ```bash
   git commit -m "docs(python): update testing requirements to pytest 8.0+"
   ```

5. **Push and create PR:**
   ```bash
   git push origin feature/update-python-standards
   ```

### Versioning Standards

Tag releases for teams to pin to specific versions:

```bash
git tag -a v1.0.0 -m "Initial standards release"
git push origin v1.0.0
```

Projects can pin to versions:
```bash
cd .standards
git checkout v1.0.0
cd ..
git add .standards
git commit -m "chore: pin standards to v1.0.0"
```

## Automating Updates

### Git Hooks (Automatic)

The `setup.sh` script installs git hooks that automatically check for standards updates.

#### Post-Merge Hook

Automatically runs after `git pull` or `git merge`:

```bash
# .git/hooks/post-merge
#!/bin/bash
if [ -d ".standards" ]; then
    cd .standards
    git fetch origin
    # Check if updates available
    # Notify user to run sync-standards.sh
fi
```

### Manual Sync Script

Run `sync-standards.sh` to manually update:

```bash
# In project root
./.standards/sync-standards.sh

# Or if standards are in different location
/path/to/standards/sync-standards.sh
```

### CI/CD Integration

Add to your CI pipeline to check standards are up to date:

```yaml
# .github/workflows/standards-check.yml
name: Check Standards

on: [push, pull_request]

jobs:
  check-standards:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          submodules: true
      
      - name: Check standards are up to date
        run: |
          cd .standards
          git fetch origin
          LOCAL=$(git rev-parse HEAD)
          REMOTE=$(git rev-parse origin/main)
          if [ "$LOCAL" != "$REMOTE" ]; then
            echo "⚠️ Standards are out of date"
            exit 1
          fi
```

### Scheduled Updates (Optional)

Use GitHub Actions scheduled workflow to auto-update:

```yaml
# .github/workflows/update-standards.yml
name: Update Standards

on:
  schedule:
    - cron: '0 0 * * 1'  # Weekly on Monday
  workflow_dispatch:

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          submodules: true
      
      - name: Update standards submodule
        run: |
          cd .standards
          git pull origin main
          cd ..
          git add .standards
          git commit -m "chore: update standards submodule" || exit 0
          git push
```

## Team Collaboration

### Onboarding New Team Members

1. **Clone project** (submodule included):
   ```bash
   git clone --recurse-submodules <project-url>
   ```

2. **Or initialize submodule:**
   ```bash
   git clone <project-url>
   git submodule update --init --recursive
   ```

3. **Run setup:**
   ```bash
   .standards/setup.sh
   ```

4. **Restart Cursor** to load rules

### Sharing Standards Updates

When standards are updated:

1. **Standards maintainer** pushes changes
2. **Team members** run sync:
   ```bash
   .standards/sync-standards.sh
   ```
3. **Or pull submodule:**
   ```bash
   git submodule update --remote .standards
   ```

### Notification Strategy

- **Slack/Discord:** Post in team channel when standards updated
- **GitHub Releases:** Create release notes for major changes
- **Email:** Weekly digest of standards changes (optional)

## Troubleshooting

### Cursor Not Loading Rules

**Problem:** Cursor doesn't seem to use `.cursorrules`

**Solutions:**
1. Ensure `.cursorrules` is in project root (not subdirectory)
2. Restart Cursor completely (quit and reopen)
3. Check file permissions: `chmod 644 .cursorrules`
4. Verify file encoding is UTF-8

### Standards Out of Sync

**Problem:** Standards files are outdated

**Solutions:**
```bash
# Option 1: Use sync script
.standards/sync-standards.sh

# Option 2: Manual submodule update
cd .standards
git pull origin main
cd ..
cp .standards/.cursorrules .cursorrules

# Option 3: Re-initialize submodule
git submodule deinit .standards
git submodule update --init .standards
```

### Git Submodule Issues

**Problem:** Submodule shows as modified or detached HEAD

**Solutions:**
```bash
# Check submodule status
git submodule status

# Fix detached HEAD
cd .standards
git checkout main
cd ..

# Update submodule reference
git add .standards
git commit -m "chore: update standards submodule"
```

### Conflicting .cursorrules

**Problem:** Project has custom `.cursorrules` that conflicts

**Solutions:**
1. **Merge manually:** Combine project-specific rules with standards
2. **Use include:** Reference standards in project rules:
   ```bash
   # .cursorrules
   @include .standards/.cursorrules
   
   # Project-specific rules
   ## Custom Project Rules
   ...
   ```
3. **Separate files:** Keep standards in `.standards/.cursorrules` and project rules in `.cursorrules`

## Best Practices

1. **Regular Updates:** Sync standards weekly or after major updates
2. **Version Pinning:** Pin to specific versions for production projects
3. **Documentation:** Keep project-specific deviations documented
4. **Testing:** Test standards changes in a test project before deploying
5. **Communication:** Notify team when making breaking changes to standards

## Advanced: Custom Standards

To extend standards for project-specific needs:

1. **Create project standards file:**
   ```bash
   touch 15_project_specific_standards.md
   ```

2. **Update .cursorrules** to reference it:
   ```bash
   # Add to .cursorrules
   - `15_project_specific_standards.md` - Project-specific rules
   ```

3. **Commit to project** (not standards repo):
   ```bash
   git add 15_project_specific_standards.md .cursorrules
   git commit -m "docs: add project-specific standards"
   ```

This keeps standards repo clean while allowing project customization.

