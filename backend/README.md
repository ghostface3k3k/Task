# HR Management System - Backend

Backend service for the HR Management System built with NestJS and GraphQL.

## Technology Stack

- **NestJS** - Progressive Node.js framework
- **GraphQL** - API query language with Apollo Server
- **TypeScript** - Type-safe JavaScript
- **Node.js** - JavaScript runtime

## Installation

```bash
npm install
```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm run build
npm start
```

The server will start on http://localhost:3000

## GraphQL Playground

Access the GraphQL playground at: http://localhost:3000/graphql

## Available Queries

### Get Department
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

### Get All Departments
```graphql
query GetDepartments {
  departments {
    id
    name
    code
    manager
    location
    employeesNumber
    status
  }
}
```

### Get Employees
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

## Available Mutations

### Update Department
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

Variables:
```json
{
  "id": "1",
  "input": {
    "name": "Updated Department Name",
    "status": true
  }
}
```

### Delete Employee
```graphql
mutation DeleteEmployee($departmentId: ID!, $employeeId: ID!) {
  deleteEmployee(departmentId: $departmentId, employeeId: $employeeId)
}
```

### Add Employee
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

Variables:
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

## Project Structure

```
backend/
├── src/
│   ├── data/
│   │   └── department.json       # Static department data
│   ├── resolvers/
│   │   ├── department.resolver.ts # Department GraphQL resolver
│   │   └── employee.resolver.ts   # Employee GraphQL resolver
│   ├── services/
│   │   └── department.service.ts  # Department business logic
│   ├── schema.graphql            # GraphQL schema definition
│   ├── app.module.ts             # Main application module
│   └── main.ts                   # Application entry point
├── package.json
├── tsconfig.json
└── README.md
```

## Data Storage

The application uses static data from `src/data/department.json`. All changes are persisted to this file.

## CORS Configuration

The backend is configured to allow requests from:
- `http://localhost:5173` (Frontend development server)

## Environment Variables

No environment variables are required for basic operation. The server runs on port 3000 by default.

## Notes

- This is a development setup using static JSON data
- No database is required
- All data persists in the department.json file
- GraphQL playground is enabled for easy testing
