---
sidebar_position: 2
---

# Guards

Guards provide authentication and authorization middleware to protect your routes. This guide shows how to implement a complete guard system.

## Core Guard Components

A complete guard system consists of several components:

1. Base Guard Middlewares
2. Role-based Guards
3. Refresh Token Guards
4. Guard Service
5. Implementation in Routes

## Guard Middlewares

### User Guard

The basic user authentication guard:

```typescript
// Example of user guard implementation
import {
  HttpException,
  type IRequestContext,
  type Middleware,
} from "@thanhhoajs/thanhhoa";

export class UserGuard {
  constructor(private readonly jwtService: JwtService) {}

  check: Middleware = async (context: IRequestContext, next) => {
    const token = context.request.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      throw new HttpException("Unauthorized", 401);
    }

    try {
      const user = await this.jwtService.verifyToken(token, userAuthConfig);
      context.user = user;
      return next();
    } catch (error) {
      throw error;
    }
  };
}
```

### Admin Guard

Similar to user guard but for admin authentication:

```typescript
// Example of admin guard implementation
export class AdminGuard {
  constructor(private readonly jwtService: JwtService) {}

  check: Middleware = async (context: IRequestContext, next) => {
    const token = context.request.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      throw new HttpException("Unauthorized", 401);
    }

    try {
      const admin = await this.jwtService.verifyToken(token, adminAuthConfig);
      context.admin = admin;
      return next();
    } catch (error) {
      throw error;
    }
  };
}
```

## Role-Based Authorization

Implement role checking with a dedicated guard:

```typescript
export enum RoleEnum {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  USER = "USER",
}
```

```typescript
export class RoleGuard {
  private requiredRole: RoleEnum;

  constructor(role: RoleEnum) {
    this.requiredRole = role;
  }

  check: Middleware = async (context: IRequestContext, next) => {
    try {
      const { admin } = context;
      if (admin.role !== this.requiredRole)
        throw new HttpException("Forbidden access", 403);

      return next();
    } catch (error) {
      throw error;
    }
  };
}
```

## Guard Service Implementation

Create a centralized service to manage guards:

```typescript
import { AdminGuard } from "../middlewares/admin-guard.middleware";
import { RoleGuard } from "../middlewares/role-guard.middleware";
import { UserGuard } from "../middlewares/user-guard.middleware";

const adminGuardInstance = new AdminGuard(jwtService);
const userGuardInstance = new UserGuard(jwtService);

export const GUARD = (role: RoleEnum) => {
  if (role === RoleEnum.SUPER_ADMIN || role === RoleEnum.ADMIN) {
    return adminGuardInstance.check;
  }
  return userGuardInstance.check;
};

export const ROLE_GUARD = (role: RoleEnum) => new RoleGuard(role).check;
```

## Using Guards in Routes

Example of implementing guards in a module:

```typescript
export class UserModule {
  constructor(app: ThanhHoa) {
    // Protected user route
    app.get("/user", GUARD(RoleEnum.USER), (context: IRequestContext) =>
      userController.getProfile(context)
    );

    // Protected admin route with role check
    app.get(
      "/users",
      GUARD(RoleEnum.ADMIN),
      ROLE_GUARD(RoleEnum.ADMIN),
      (context: IRequestContext) =>
        userController.getUsersWithPagination(context)
    );
  }
}
```

## Refresh Token Guards

For handling token refresh operations:

```typescript
export class UserRefreshTokenGuard {
  constructor(private readonly jwtService: JwtService) {}

  check: Middleware = async (context: IRequestContext, next) => {
    const token = context.request.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      throw new HttpException("Unauthorized", 401);
    }

    try {
      const user = await this.jwtService.verifyRefreshToken(
        token,
        userAuthConfig
      );
      context.user = user;
      return next();
    } catch (error) {
      throw error;
    }
  };
}
```

## Context Types

Guards extend the request context with user/admin information:

```typescript
interface IRequestContext {
  user?: {
    id: number;
    email: string;
    role: string;
  };
  admin?: {
    id: number;
    role: RoleEnum;
  };
}
```

## Best Practices

1. **Token Validation**: Always verify tokens in guards
2. **Role Checking**: Use role guards for fine-grained access control
3. **Error Handling**: Implement proper error handling for authentication failures
4. **Refresh Tokens**: Use separate guards for refresh token operations
5. **Context Types**: Maintain proper typing for context objects

## Common Scenarios

### Protected User Routes

```typescript
app.get("/profile", GUARD(RoleEnum.USER), userController.getProfile);
```

### Admin-Only Routes

```typescript
app.get(
  "/admin/dashboard",
  GUARD(RoleEnum.ADMIN),
  ROLE_GUARD(RoleEnum.ADMIN),
  adminController.getDashboard
);
```

### Super Admin Routes

```typescript
app.post(
  "/admin/settings",
  GUARD(RoleEnum.ADMIN),
  ROLE_GUARD(RoleEnum.SUPER_ADMIN),
  settingsController.update
);
```
