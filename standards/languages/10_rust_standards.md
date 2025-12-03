# Rust Standards

## 1. Package Management

* **Tool:** `cargo`. `Cargo.toml` for dependencies.
* **Version:** Rust 1.70+ (use latest stable).
* **Lock Files:** `Cargo.lock` committed for applications, not libraries.

## 2. Code Style

* **Formatter:** `rustfmt`. Run via `make fmt` or `cargo fmt`.
* **Linter:** `clippy`. Run via `cargo clippy -- -D warnings`.
* **Type Checker:** Compiler strict warnings. Use `#![deny(warnings)]` in lib.rs.

### rustfmt.toml

```toml
edition = "2021"
max_width = 100
tab_spaces = 4
```

## 3. Naming Conventions

* **Files:** `snake_case.rs`
* **Modules:** `snake_case`
* **Types/Structs/Enums:** `PascalCase`
* **Functions/Variables:** `snake_case`
* **Constants:** `UPPER_SNAKE_CASE`
* **Lifetimes:** Single lowercase letter: `'a`, `'b`

## 4. Project Structure

```
src/
├── domain/
│   ├── entities.rs
│   └── value_objects.rs
├── application/
│   ├── use_cases.rs
│   └── interfaces.rs
└── infrastructure/
    └── repositories.rs
```

## 5. Language Features

* **Ownership:** Understand ownership, borrowing, and lifetimes. Prefer borrowing over cloning.
* **Error Handling:** Use `Result<T, E>` for fallible operations. Use `?` operator for propagation.
* **Option:** Use `Option<T>` for nullable values. Prefer over `null`/`None` patterns.
* **Pattern Matching:** Use `match` and `if let` for exhaustive pattern matching.

### Example

```rust
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Email {
    value: String,
}

impl Email {
    pub fn new(value: String) -> Result<Self, InvalidEmailError> {
        if !value.contains('@') || !value.contains('.') {
            return Err(InvalidEmailError(value));
        }
        Ok(Email { value })
    }
    
    pub fn as_str(&self) -> &str {
        &self.value
    }
}

#[derive(Debug, thiserror::Error)]
#[error("Invalid email: {0}")]
pub struct InvalidEmailError(String);
```

## 6. Error Handling

* **Error Types:** Use `thiserror` for library errors, `anyhow` for application errors.
* **Result:** Use `Result<T, E>` for all fallible operations. Never use panics for expected errors.
* **Propagation:** Use `?` operator for error propagation. Handle errors at boundaries.

```rust
use thiserror::Error;

#[derive(Error, Debug)]
pub enum DomainError {
    #[error("Invalid email: {0}")]
    InvalidEmail(String),
    
    #[error("User not found: {0}")]
    UserNotFound(String),
    
    #[error("Database error: {0}")]
    Database(#[from] sqlx::Error),
}
```

## 7. Testing

* **Framework:** Built-in `#[test]` and `#[cfg(test)]`. Use `cargo test`.
* **Mocking:** Use `mockall` for trait mocking. Use test doubles for integration tests.
* **Coverage:** Use `cargo-tarpaulin` or `grcov`. Target 90%+ for application, 100% for domain.

### Test Structure

```rust
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn should_create_user_with_valid_email() {
        // Given
        let email = Email::new("test@example.com".to_string()).unwrap();
        
        // When
        let user = User::new(email, "Test User".to_string());
        
        // Then
        assert_eq!(user.email().as_str(), "test@example.com");
    }
}
```

## 8. Async/Await

* **Runtime:** Use `tokio` or `async-std` for async runtime.
* **Futures:** Use `async`/`await` syntax. Use `Future` trait for custom futures.
* **Error Handling:** Use `Result<T, E>` with async functions. Handle errors with `?`.

```rust
use tokio;

async fn fetch_user(id: &str) -> Result<User, DomainError> {
    let user = user_repository
        .find_by_id(id)
        .await?
        .ok_or_else(|| DomainError::UserNotFound(id.to_string()))?;
    Ok(user)
}
```

## 9. Dependencies

### Common Crates

* **HTTP:** `reqwest` (client), `axum` or `actix-web` (server)
* **Database:** `sqlx` (async SQL), `diesel` (ORM), `sea-orm` (async ORM)
* **Serialization:** `serde` with `serde_json`
* **Error Handling:** `thiserror`, `anyhow`
* **Logging:** `tracing` with `tracing-subscriber`

## 10. Documentation

* **Doc Comments:** Use `///` for public items, `//!` for module-level docs.
* **Format:** Use Markdown. Include examples with `#` for hidden code.

```rust
/// Creates a new user with validated email address.
///
/// # Arguments
///
/// * `email` - Valid email address (must match RFC 5322)
/// * `name` - User's full name (non-null, non-empty)
///
/// # Returns
///
/// New `User` entity instance.
///
/// # Errors
///
/// Returns `InvalidEmailError` if email format is invalid.
///
/// # Examples
///
/// ```rust
/// # use domain::email::Email;
/// let email = Email::new("test@example.com".to_string())?;
/// let user = User::new(email, "John Doe".to_string());
/// ```
pub fn create_user(email: Email, name: String) -> User {
    // Implementation
}
```

## 11. Memory Safety

* **Ownership:** Understand ownership rules. Use references (`&`) to avoid moving.
* **Lifetimes:** Use lifetime parameters (`'a`) when necessary. Prefer higher-ranked trait bounds.
* **Unsafe:** Avoid `unsafe` code unless absolutely necessary. Document why unsafe is needed.

## 12. Performance

* **Zero-Cost Abstractions:** Leverage Rust's zero-cost abstractions (iterators, closures).
* **Allocation:** Minimize allocations. Use `&str` over `String` when possible.
* **Profiling:** Use `cargo flamegraph` or `perf` for performance profiling.

## 13. Cargo Features

* **Feature Flags:** Use `[features]` in `Cargo.toml` for optional dependencies.
* **Workspaces:** Use workspaces for monorepo structure.
* **Publishing:** Follow semantic versioning. Use `cargo publish` for crates.io.

