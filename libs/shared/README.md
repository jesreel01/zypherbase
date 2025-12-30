# @zypherbase/shared

Shared library for the Zypherbase monorepo, containing DTOs, interfaces, types, and other common utilities shared between the server and client.

## Installation

This package is designed to be used within the monorepo.

To add it to an app (e.g., server or client):

```bash
pnpm add @zypherbase/shared --filter <app-name>
```

Or manually add it to your app's `package.json`:

```json
{
  "dependencies": {
    "@zypherbase/shared": "workspace:*"
  }
}
```

## Usage

Import DTOs and interfaces directly from the package:

```typescript
import { LoginDto, RegisterDto, AuthResponse } from "@zypherbase/shared";

// Use in your code
const loginData: LoginDto = {
  email: "user@example.com",
  password: "password123",
};
```

## Structure

- **DTOs** (`src/dto`): Data Transfer Objects with `class-validator` decorators.
- **Interfaces** (`src/interfaces`): TypeScript interfaces for type safety.

## Development

- **Build**: `pnpm build`
- **Watch**: `pnpm dev`
