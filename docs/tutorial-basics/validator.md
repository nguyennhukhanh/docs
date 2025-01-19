---
sidebar_position: 7
---

# Validator

**Validator** is a powerful feature of ThanhHoaJS Framework that enables robust data validation with a simple, chainable API.

### Installation

Install the validator using **Bun**:

```bash
bun add @thanhhoajs/validator
```

### Basic Example:

```typescript
import { createValidator } from "@thanhhoajs/validator";

const validator = createValidator();

validator.field("username").required().string().min(3).max(20);
validator.field("email").required().email();

const data = {
  username: "khanhnguyen",
  email: "khanh@example.com",
};

const errors = validator.validate(data);
```

### Configuration Method:

You can also define validation rules using a configuration object:

```typescript
const validator = createValidator();

validator.configure({
  username: (field) => field.required().string().min(3).max(20),
  email: (field) => field.required().email(),
  age: (field) => field.number().min(18),
});
```

### Common Validation Methods:

- `required()` - Makes a field mandatory
- `optional()` - Makes a field optional
- `string()` - Validates string type
- `number()` - Validates number type
- `email()` - Validates email format
- `min(value)` - Sets minimum value/length
- `max(value)` - Sets maximum value/length
- `pattern(regex)` - Validates against regex pattern
- `custom(fn)` - Adds custom validation logic

### Custom Validation Example:

```typescript
validator
  .field("password")
  .required()
  .min(8)
  .custom(
    (value) => /[A-Z]/.test(value) && /[0-9]/.test(value),
    "Password must contain uppercase and number"
  );
```
