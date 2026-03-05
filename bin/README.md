# bin/

Command-line tools for GitHub Projects V2 integration.

## gh-task

A CLI tool that manages the full lifecycle of GitHub Project tasks: create, start, update status, and submit PRs — all with automatic project board sync.

### Commands

| Command | Description |
|---------|-------------|
| `gh-task create` | Create a new task and add it to the project board |
| `gh-task start` | Move task to "In Progress" and create a feature branch |
| `gh-task status` | Show current task status |
| `gh-task update` | Update task fields (status, priority, etc.) |
| `gh-task submit` | Run tests, create a draft PR, and move task to "In Review" |

### Documentation

- [Quick Start Guide](../docs/GH_TASK_QUICKSTART.md)
- [Full CLI Reference](../docs/GH_TASK_GUIDE.md)
- [Tooling & Architecture](../docs/TOOLING.md)
