---
title: "Ruby and Rails Standards: Language 10"
date: 2026-03-03
authors:
  - name: C65 LLC
---

Coding Standards now covers 10 languages with the addition of Ruby (including Rails-specific standards).

## What's New

**Ruby standards** (`lang-10`) cover idiomatic Ruby patterns: method naming, block usage, exception handling, Sorbet/RBS typing, and RuboCop configuration. The standard follows community conventions — `snake_case` methods, `?` and `!` suffixes, frozen string literals.

**Ruby on Rails standards** (`lang-11`) complement the base Ruby standard and address Rails-specific patterns: Active Record best practices, controller/service object boundaries, view helpers vs. presenters, Action Cable conventions, and Rails security (strong parameters, CSRF, SQL injection via Active Record).

Both standards include security sections with Brakeman for SAST and bundler-audit for dependency scanning.

## File Numbering Restructure

Adding Ruby required renumbering some existing standards to maintain alphabetical ordering within the `lang-XX` prefix scheme. The restructure keeps the numbering consistent and leaves room for future additions.

## Coverage

With Ruby and Rails, the framework now covers:

Python, Java, Kotlin, Swift, Dart, TypeScript, JavaScript, Rust, Zig, Ruby/Rails

All 10 language standards share the same structure: naming conventions, architecture patterns, testing requirements, error handling, and a security section referencing the P0-P2 severity model.

See the standards: [Ruby](/standards/languages/lang-10_ruby_standards/) | [Ruby on Rails](/standards/languages/lang-11_ruby_on_rails_standards/)
