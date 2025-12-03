# Python Standards

## 1. Package Management

* **Tool:** `poetry` or `uv` for dependency management. Lock files committed.
* **Virtual Environments:** Always use isolated environments. Never install globally.
* **Requirements:** `pyproject.toml` for modern projects. `requirements.txt` only for legacy compatibility.

## 2. Code Style

* **Formatter:** `black` with line length 100. Run via `make fmt`.
* **Linter:** `ruff` for fast linting. `pylint` for comprehensive analysis.
* **Type Checker:** `mypy` or `pyright` in strict mode. Type hints required for all public APIs.

### Configuration

```toml
[tool.black]
line-length = 100
target-version = ['py311']

[tool.ruff]
line-length = 100
select = ["E", "F", "I", "N", "W", "UP"]

[tool.mypy]
strict = true
warn_return_any = true
warn_unused_configs = true
```

## 3. Naming Conventions

* **Modules:** `snake_case.py`
* **Classes:** `PascalCase`
* **Functions/Variables:** `snake_case`
* **Constants:** `UPPER_SNAKE_CASE`
* **Private:** `_single_leading_underscore` (module-level)
* **Name Mangling:** `__double_leading_underscore` (class-level, avoid unless necessary)

## 4. Type Hints

* **Required:** All public functions, methods, class attributes.
* **Style:** Use `typing` module. Prefer `list[str]` over `List[str]` (Python 3.9+).
* **Protocols:** Use `Protocol` for structural subtyping instead of ABCs when appropriate.
* **Generics:** Use `TypeVar` and `Generic` for reusable type parameters.

### Example

```python
from typing import Protocol, TypeVar

T = TypeVar("T")

class Repository(Protocol[T]):
    def find_by_id(self, id: str) -> T | None: ...
    def save(self, entity: T) -> None: ...
```

## 5. Project Structure

```
package_name/
├── __init__.py
├── domain/
│   ├── __init__.py
│   ├── entities.py
│   └── value_objects.py
├── application/
│   ├── __init__.py
│   ├── use_cases.py
│   └── interfaces.py
└── infrastructure/
    ├── __init__.py
    └── repositories.py
```

## 6. Testing

* **Framework:** `pytest`. Use fixtures for test dependencies.
* **Coverage:** `pytest-cov`. Target 90%+ for application layer, 100% for domain.
* **Mocking:** `unittest.mock` or `pytest-mock`. Mock external dependencies only.

### Test Structure

```python
# tests/domain/test_user.py
import pytest
from domain.entities import User

def test_should_create_user_with_valid_email():
    user = User(email="test@example.com", name="Test User")
    assert user.email == "test@example.com"
```

## 7. Error Handling

* **Custom Exceptions:** Define in domain layer. Inherit from domain base exception.
* **Type:** Use typed exceptions. No bare `except:` clauses.
* **Context:** Use `raise ... from` for exception chaining.

```python
class DomainError(Exception):
    """Base exception for domain layer."""
    pass

class InvalidEmailError(DomainError):
    """Raised when email validation fails."""
    pass
```

## 8. Async/Await

* **Use When:** I/O-bound operations (database, HTTP, file operations).
* **Framework:** `asyncio` for core, `aiohttp`/`httpx` for HTTP, `asyncpg`/`aiomysql` for databases.
* **Type Hints:** Use `Coroutine`, `Awaitable` for return types.

## 9. Dependencies

### Common Libraries

* **HTTP:** `httpx` (async), `requests` (sync)
* **Database:** `sqlalchemy` (ORM), `asyncpg` (async PostgreSQL)
* **Validation:** `pydantic` for data validation and settings
* **Logging:** `structlog` for structured logging

## 10. Documentation

* **Docstrings:** Google or NumPy style. Required for all public classes and functions.
* **Type Info:** Type hints preferred over docstring type annotations.
* **Examples:** Include usage examples in docstrings for complex functions.

```python
def create_user(email: str, name: str) -> User:
    """Create a new user with validated email.

    Args:
        email: Valid email address.
        name: User's full name.

    Returns:
        User entity instance.

    Raises:
        InvalidEmailError: If email format is invalid.

    Example:
        >>> user = create_user("test@example.com", "John Doe")
        >>> user.email
        'test@example.com'
    """
    # Implementation
```

