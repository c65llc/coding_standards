# Project Standards Repository

This repository contains comprehensive standards and guidelines for software development projects, designed to work seamlessly with Cursor AI and other development tools.

## Quick Start

### For Cursor AI Users

1. **Clone this repository** to your local machine or organization
2. **Copy `.cursorrules`** to your project root (or reference it)
3. **Reference standards files** in your project's `.cursorrules` or workspace

### For Team Sharing

1. **Clone as submodule** in your projects:
   ```bash
   git submodule add https://github.com/c65llc/coding_standards.git .standards
   ```

2. **Symlink `.cursorrules`** to your project:
   ```bash
   ln -s .standards/.cursorrules .cursorrules
   ```

3. **Use automation scripts** (see below) to keep standards updated

## Repository Structure

```
.
├── .cursorrules                    # Cursor AI configuration
├── README.md                       # Main entry point
├── Makefile                        # Automation targets
│
├── standards/                      # All standards documents
│   ├── architecture/              # Core architecture & automation
│   │   ├── 00_project_standards_and_architecture.md
│   │   ├── 01_automation_standards.md
│   │   └── 02_cursor_automation_standards.md
│   ├── languages/                # Language-specific standards
│   │   ├── 03_python_standards.md
│   │   ├── 04_java_standards.md
│   │   ├── 05_kotlin_standards.md
│   │   ├── 06_swift_standards.md
│   │   ├── 07_dart_standards.md
│   │   ├── 08_typescript_standards.md
│   │   ├── 09_javascript_standards.md
│   │   ├── 10_rust_standards.md
│   │   └── 11_zig_standards.md
│   └── process/                   # Process & workflow standards
│       ├── 12_documentation_standards.md
│       ├── 13_git_version_control_standards.md
│       └── 14_code_review_expectations.md
│
├── scripts/                       # Automation scripts
│   ├── setup.sh                  # Setup script for new projects
│   └── sync-standards.sh         # Sync script for existing projects
│
└── docs/                          # Documentation
    ├── README.md                 # This file (detailed guide)
    ├── QUICK_START.md            # 5-minute setup guide
    ├── SETUP_GUIDE.md            # Detailed setup instructions
    └── INTEGRATION_GUIDE.md       # Complete integration guide
```

## Usage

### Option 1: Direct Reference (Single Project)

Copy `.cursorrules` to your project root. Cursor will automatically use it.

### Option 2: Git Submodule (Multiple Projects)

1. Add as submodule:
   ```bash
   git submodule add https://github.com/c65llc/coding_standards.git .standards
   ```

2. Create `.cursorrules` in your project:
   ```bash
   # .cursorrules
   @include .standards/.cursorrules
   ```

3. Run setup script:
   ```bash
   .standards/scripts/setup.sh
   ```

### Option 3: Symlink (Local Development)

```bash
ln -s /path/to/standards/.cursorrules .cursorrules
```

## Automation

### Setup Script

Run `scripts/setup.sh` in a new project to:
- Copy `.cursorrules` to project root
- Set up git hooks for standards sync
- Configure project-specific settings

### Sync Script

Run `scripts/sync-standards.sh` to:
- Pull latest standards from repository
- Update `.cursorrules` if changed
- Notify if standards files were updated

### Git Hooks

The setup script installs git hooks that:
- **Pre-commit:** Check if standards files changed
- **Post-merge:** Auto-sync standards after pulling

## Maintenance

### Updating Standards

1. Make changes to standards files
2. Commit with conventional commit format:
   ```bash
   git commit -m "docs(standards): update python testing requirements"
   ```
3. Push to repository
4. Team members run `sync-standards.sh` or pull latest changes

### Versioning

Standards are versioned with git tags:
```bash
git tag -a v1.0.0 -m "Initial standards release"
git push origin v1.0.0
```

Projects can pin to specific versions via submodule commits.

## Contributing

1. Create feature branch: `git checkout -b feature/new-standard`
2. Make changes following existing format
3. Update `.cursorrules` if adding new standards files
4. Commit with conventional format
5. Open Pull Request

## Integration with CI/CD

Add standards validation to CI:

```yaml
# .github/workflows/standards-check.yml
- name: Check standards are up to date
  run: |
    cd .standards
    git fetch
    git diff --exit-code HEAD origin/main || \
      echo "Standards out of date. Run sync-standards.sh"
```

## Troubleshooting

### Cursor Not Using Rules

1. Ensure `.cursorrules` is in project root
2. Restart Cursor after adding/updating `.cursorrules`
3. Check file permissions (must be readable)

### Standards Out of Sync

1. Run `scripts/sync-standards.sh` or `make sync-standards`
2. Or manually: `cd .standards && git pull`

### Git Submodule Issues

```bash
# Update submodule
git submodule update --remote .standards

# Initialize if missing
git submodule update --init --recursive
```

## License

[Specify your license here]

## Support

For questions or issues, open an issue in this repository.

