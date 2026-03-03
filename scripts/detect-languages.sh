#!/bin/bash
# Detect project languages by checking for manifest files in the project root.
# Outputs one language key per line to stdout.
#
# Usage: PROJECT_ROOT=/path/to/project ./detect-languages.sh
#   or:  ./detect-languages.sh /path/to/project

set -e

PROJECT_ROOT="${1:-${PROJECT_ROOT:-$(git rev-parse --show-toplevel 2>/dev/null || pwd)}}"

# python
for f in pyproject.toml setup.py requirements.txt Pipfile uv.lock; do
    if [ -f "$PROJECT_ROOT/$f" ]; then
        echo "python"
        break
    fi
done

# rust
if [ -f "$PROJECT_ROOT/Cargo.toml" ]; then
    echo "rust"
fi

# ruby
for f in Gemfile .ruby-version; do
    if [ -f "$PROJECT_ROOT/$f" ]; then
        echo "ruby"
        break
    fi
done

# javascript (covers JS and TS)
for f in package.json deno.json; do
    if [ -f "$PROJECT_ROOT/$f" ]; then
        echo "javascript"
        break
    fi
done

# jvm (Java, Kotlin, Scala, etc.)
for f in build.gradle build.gradle.kts pom.xml; do
    if [ -f "$PROJECT_ROOT/$f" ]; then
        echo "jvm"
        break
    fi
done

# swift
if [ -f "$PROJECT_ROOT/Package.swift" ]; then
    echo "swift"
fi

# dart
if [ -f "$PROJECT_ROOT/pubspec.yaml" ]; then
    echo "dart"
fi

# zig
if [ -f "$PROJECT_ROOT/build.zig" ]; then
    echo "zig"
fi
