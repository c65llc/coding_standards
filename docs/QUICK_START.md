# Quick Start Guide

Get up and running with project standards in 5 minutes.

## For Cursor AI Users

### Step 1: Get the Standards

**Option A: Clone this repository**
```bash
git clone https://github.com/c65llc/coding_standards.git .standards
```

**Option B: Add as submodule (recommended for teams)**
```bash
git submodule add https://github.com/c65llc/coding_standards.git .standards
```

### Step 2: Setup

```bash
.standards/scripts/setup.sh
```

This creates `.cursorrules` in your project root.

### Step 3: Restart Cursor

Quit and reopen Cursor to load the rules.

## For Standards Maintainers

### Making Changes

1. Edit standards files
2. Update `.cursorrules` if adding new files
3. Commit with conventional format:
   ```bash
   git commit -m "docs(python): update testing standards"
   ```
4. Push and tag if releasing:
   ```bash
   git tag -a v1.1.0 -m "Release 1.1.0"
   git push origin main --tags
   ```

### Syncing in Projects

Team members run:
```bash
make sync-standards
# or
.standards/scripts/sync-standards.sh
```

## Common Commands

```bash
# Setup standards in a project
make setup

# Sync standards (pull latest)
make sync-standards

# Check if standards are up to date
make check-standards

# Update standards submodule
make update-standards
```

## File Structure

```
your-project/
├── .cursorrules          # Auto-generated from standards
├── .standards/           # Standards submodule
│   ├── .cursorrules
│   ├── standards/        # Standards documents
│   │   ├── architecture/
│   │   ├── languages/
│   │   └── process/
│   ├── scripts/          # Automation scripts
│   └── docs/             # Documentation
└── ...
```

## Troubleshooting

**Cursor not using rules?**
- Ensure `.cursorrules` is in project root
- Restart Cursor completely

**Standards out of date?**
```bash
make sync-standards
```

**Need help?**
See `SETUP_GUIDE.md` for detailed instructions.

