# API Documentation

## GraphQL API Reference

Base URL: `http://localhost:4000/graphql`

## Authentication

All queries and mutations (except `login` and `register`) require JWT authentication.

### Headers
```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## Mutations

### Authentication

#### Register User
Create a new user account.

```graphql
mutation Register($email: String!, $password: String!, $role: String) {
  register(email: $email, password: $password, role: $role) {
    access_token
    user {
      id
      email
      role
      created_at
      updated_at
    }
  }
}
```

**Variables:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "role": "admin"
}
```

**Response:**
```json
{
  "data": {
    "register": {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "user": {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "email": "user@example.com",
        "role": "admin",
        "created_at": "2024-01-22T10:00:00Z",
        "updated_at": "2024-01-22T10:00:00Z"
      }
    }
  }
}
```

#### Login
Authenticate existing user.

```graphql
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    access_token
    user {
      id
      email
      role
    }
  }
}
```

**Variables:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

---

### Employee Management

#### Create Employee

```graphql
mutation CreateEmployee($createEmployeeInput: CreateEmployeeInput!) {
  createEmployee(createEmployeeInput: $createEmployeeInput) {
    id
    firstName
    lastName
    email
    phone
    dateOfBirth
    position
    created_at
    updated_at
    department {
      id
      name
      code
    }
  }
}
```

**Variables:**
```json
{
  "createEmployeeInput": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "+1-555-0100",
    "dateOfBirth": "1990-01-15",
    "position": "Software Engineer",
    "departmentId": "550e8400-e29b-41d4-a716-446655440000"
  }
}
```

#### Update Employee

```graphql
mutation UpdateEmployee($id: String!, $updateEmployeeInput: UpdateEmployeeInput!) {
  updateEmployee(id: $id, updateEmployeeInput: $updateEmployeeInput) {
    id
    firstName
    lastName
    email
    position
    updated_at
  }
}
```

**Variables:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440001",
  "updateEmployeeInput": {
    "position": "Senior Software Engineer",
    "phone": "+1-555-0101"
  }
}
```

#### Delete Employee

```graphql
mutation DeleteEmployee($id: String!) {
  deleteEmployee(id: $id)
}
```

**Variables:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440001"
}
```

**Response:**
```json
{
  "data": {
    "deleteEmployee": true
  }
}
```

---

### Department Management

#### Create Department

```graphql
mutation CreateDepartment($createDepartmentInput: CreateDepartmentInput!) {
  createDepartment(createDepartmentInput: $createDepartmentInput) {
    id
    name
    code
    manager
    location
    created_at
    updated_at
  }
}
```

**Variables:**
```json
{
  "createDepartmentInput": {
    "name": "Engineering",
    "code": "ENG",
    "manager": "Jane Smith",
    "location": "San Francisco"
  }
}
```

#### Update Department

```graphql
mutation UpdateDepartment($id: String!, $updateDepartmentInput: UpdateDepartmentInput!) {
  updateDepartment(id: $id, updateDepartmentInput: $updateDepartmentInput) {
    id
    name
    code
    manager
    location
    updated_at
  }
}
```

**Variables:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440002",
  "updateDepartmentInput": {
    "manager": "John Smith",
    "location": "New York"
  }
}
```

#### Delete Department

```graphql
mutation DeleteDepartment($id: String!) {
  deleteDepartment(id: $id)
}
```

---

## Queries

### Employee Queries

#### Get All Employees

```graphql
query GetEmployees {
  employees {
    id
    firstName
    lastName
    email
    phone
    dateOfBirth
    position
    created_at
    updated_at
    department {
      id
      name
      code
      manager
      location
    }
  }
}
```

**Response:**
```json
{
  "data": {
    "employees": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440001",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@example.com",
        "phone": "+1-555-0100",
        "dateOfBirth": "1990-01-15",
        "position": "Software Engineer",
        "created_at": "2024-01-22T10:00:00Z",
        "updated_at": "2024-01-22T10:00:00Z",
        "department": {
          "id": "550e8400-e29b-41d4-a716-446655440000",
          "name": "Engineering",
          "code": "ENG",
          "manager": "Jane Smith",
          "location": "San Francisco"
        }
      }
    ]
  }
}
```

#### Get Single Employee

```graphql
query GetEmployee($id: String!) {
  employee(id: $id) {
    id
    firstName
    lastName
    email
    phone
    dateOfBirth
    position
    created_at
    updated_at
    department {
      id
      name
      code
      manager
      location
    }
  }
}
```

**Variables:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440001"
}
```

---

### Department Queries

#### Get All Departments

```graphql
query GetDepartments {
  departments {
    id
    name
    code
    manager
    location
    created_at
    updated_at
    employees {
      id
      firstName
      lastName
      email
      phone
      position
      dateOfBirth
    }
  }
}
```

**Response:**
```json
{
  "data": {
    "departments": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "name": "Engineering",
        "code": "ENG",
        "manager": "Jane Smith",
        "location": "San Francisco",
        "created_at": "2024-01-22T10:00:00Z",
        "updated_at": "2024-01-22T10:00:00Z",
        "employees": [
          {
            "id": "550e8400-e29b-41d4-a716-446655440001",
            "firstName": "John",
            "lastName": "Doe",
            "email": "john.doe@example.com",
            "phone": "+1-555-0100",
            "position": "Software Engineer",
            "dateOfBirth": "1990-01-15"
          }
        ]
      }
    ]
  }
}
```

#### Get Single Department

```graphql
query GetDepartment($id: String!) {
  department(id: $id) {
    id
    name
    code
    manager
    location
    created_at
    updated_at
    employees {
      id
      firstName
      lastName
      email
      phone
      position
      dateOfBirth
    }
  }
}
```

**Variables:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000"
}
```

---

### User Queries

#### Get All Users (Admin only)

```graphql
query GetUsers {
  users {
    id
    email
    role
    created_at
    updated_at
  }
}
```

#### Get Single User

```graphql
query GetUser($id: String!) {
  user(id: $id) {
    id
    email
    role
    created_at
    updated_at
  }
}
```

---

## Input Types

### CreateEmployeeInput
```typescript
{
  firstName: string;      // Required
  lastName: string;       // Required
  email: string;         // Required, must be unique
  phone: string;         // Required
  dateOfBirth: string;   // Required, ISO 8601 date format
  position: string;      // Required
  departmentId?: string; // Optional, UUID
}
```

### UpdateEmployeeInput
```typescript
{
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  position?: string;
  departmentId?: string;
}
```

### CreateDepartmentInput
```typescript
{
  name: string;       // Required
  code: string;       // Required, must be unique
  manager?: string;   // Optional
  location?: string;  // Optional
}
```

### UpdateDepartmentInput
```typescript
{
  name?: string;
  code?: string;
  manager?: string;
  location?: string;
}
```

---

## Error Handling

### Common Errors

#### Unauthorized (401)
```json
{
  "errors": [
    {
      "message": "Unauthorized",
      "extensions": {
        "code": "UNAUTHENTICATED"
      }
    }
  ]
}
```

#### Not Found (404)
```json
{
  "errors": [
    {
      "message": "Employee with ID abc123 not found",
      "extensions": {
        "code": "NOT_FOUND"
      }
    }
  ]
}
```

#### Validation Error (400)
```json
{
  "errors": [
    {
      "message": "Validation failed",
      "extensions": {
        "code": "BAD_USER_INPUT",
        "validationErrors": [
          {
            "property": "email",
            "constraints": {
              "isEmail": "email must be an email"
            }
          }
        ]
      }
    }
  ]
}
```

---

## Testing with cURL

### Register User
```bash
curl -X POST http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation { register(email: \"user@example.com\", password: \"password123\", role: \"admin\") { access_token user { id email } } }"
  }'
```

### Login
```bash
curl -X POST http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation { login(email: \"user@example.com\", password: \"password123\") { access_token user { id email } } }"
  }'
```

### Get Employees (with auth)
```bash
curl -X POST http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "query": "query { employees { id firstName lastName email position } }"
  }'
```

---

## Rate Limiting

Currently no rate limiting is implemented. Consider adding rate limiting in production:
- 100 requests per minute per IP
- 1000 requests per hour per user

## Pagination

Currently all queries return full result sets. Future enhancement:
```graphql
query GetEmployees($limit: Int, $offset: Int) {
  employees(limit: $limit, offset: $offset) {
    items {
      id
      firstName
      lastName
    }
    total
    hasMore
  }
}
```

## Best Practices

1. **Always use variables** instead of inline values in queries
2. **Request only needed fields** to optimize performance
3. **Store JWT tokens securely** (httpOnly cookies in production)
4. **Implement refresh tokens** for better security
5. **Use batch operations** when creating multiple records
6. **Handle errors gracefully** on the client side
7. **Implement proper logging** on the server side

## Support

For API issues or questions, please refer to:
- GraphQL Playground: http://localhost:4000/graphql
- Backend logs: `npm run start:dev` output
- Database logs: PostgreSQL server logs
