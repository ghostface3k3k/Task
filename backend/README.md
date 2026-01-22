# HR Management System - Backend

## Description

NestJS backend with GraphQL API for the HR Management System. Manages departments and employees using static JSON data.

## Technologies

- NestJS
- GraphQL (Apollo Server)
- TypeScript
- Node.js

## Installation

```bash
npm install
```

## Running the Application

### Development Mode
```bash
npm run start:dev
```

### Production Mode
```bash
npm run build
npm start
```

The server will run on `http://localhost:3000`  
GraphQL Playground: `http://localhost:3000/graphql`

## GraphQL API

### Queries

#### Get Department
```graphql
query GetDepartment($id: ID!) {
  department(id: $id) {
    id
    name
    description
    localization {
      name
      description
    }
    code
    manager
    location
    employeesNumber
    status
    parentDepartment {
      id
      name
    }
    createdAt
    employees {
      id
      name
      role
      contact
    }
  }
}
```

Variables:
```json
{
  "id": "1"
}
```

#### Get All Departments
```graphql
query GetDepartments {
  departments {
    id
    name
    code
    manager
    employeesNumber
    status
  }
}
```

#### Get Employees by Department
```graphql
query GetEmployees($departmentId: ID!) {
  employees(departmentId: $departmentId) {
    id
    name
    role
    contact
  }
}
```

### Mutations

#### Update Department
```graphql
mutation UpdateDepartment($id: ID!, $input: UpdateDepartmentInput!) {
  updateDepartment(id: $id, input: $input) {
    id
    name
    description
    localization {
      name
      description
    }
    manager
    location
    status
  }
}
```

Example Variables:
```json
{
  "id": "1",
  "input": {
    "name": "Updated Department Name",
    "description": "Updated description",
    "localization": {
      "name": "اسم محدث",
      "description": "وصف محدث"
    },
    "manager": "Jane Doe",
    "location": "New York Office",
    "status": true
  }
}
```

#### Delete Employee
```graphql
mutation DeleteEmployee($departmentId: ID!, $employeeId: ID!) {
  deleteEmployee(departmentId: $departmentId, employeeId: $employeeId)
}
```

Example Variables:
```json
{
  "departmentId": "1",
  "employeeId": "11557"
}
```

#### Add Employee
```graphql
mutation AddEmployee($departmentId: ID!, $input: AddEmployeeInput!) {
  addEmployee(departmentId: $departmentId, input: $input) {
    id
    name
    role
    contact
  }
}
```

Example Variables:
```json
{
  "departmentId": "1",
  "input": {
    "name": "John Doe",
    "role": "Developer",
    "contact": "+1234567890"
  }
}
```

## Data Structure

The backend uses a static JSON file (`src/data/department.json`) to store and manage data. All operations (read/write) are performed on this file.

## Project Structure

```
backend/
├── src/
│   ├── data/
│   │   └── department.json       # Static data storage
│   ├── resolvers/
│   │   ├── department.resolver.ts
│   │   └── employee.resolver.ts
│   ├── services/
│   │   └── department.service.ts # Business logic
│   ├── schema.graphql            # GraphQL schema definitions
│   ├── app.module.ts             # Main application module
│   └── main.ts                   # Application entry point
├── package.json
├── tsconfig.json
└── README.md
```

## Environment Variables

No environment variables are required for basic operation. The server runs on port 3000 by default.

## Testing with GraphQL Playground

1. Start the server: `npm run start:dev`
2. Open browser: `http://localhost:3000/graphql`
3. Use the GraphQL Playground to test queries and mutations

## CORS Configuration

CORS is enabled for the following origins:
- http://localhost:5173 (Vite default)
- http://localhost:3001
- http://localhost:3000

## Notes

- All data is stored in memory and persisted to `department.json`
- No database is required
- The system uses a single department for demonstration
- Employee IDs are auto-generated using timestamps
