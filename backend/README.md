# HR Management System - Backend

Backend server for HR Management System built with NestJS and GraphQL.

## Features

- GraphQL API with Apollo Server
- Department and Employee management
- Static data storage (no database required)
- CORS enabled for frontend integration

## Tech Stack

- NestJS 10
- GraphQL with Apollo
- TypeScript 5

## Installation

```bash
npm install
```

## Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm start
```

The server will start at `http://localhost:4000`

GraphQL Playground: `http://localhost:4000/graphql`

## GraphQL API

### Queries

```graphql
# Get all departments
query {
  getAllDepartments {
    id
    name
    description
    localization
    code
    manager
    location
    employeesNumber
    status
    parentDepartment
    createdAt
    employees {
      id
      name
      role
      contact
    }
  }
}

# Get a specific department
query {
  getDepartment(id: "1") {
    id
    name
    employees {
      id
      name
      role
    }
  }
}

# Get employees by department
query {
  getEmployees(departmentId: "1") {
    id
    name
    role
    contact
  }
}
```

### Mutations

```graphql
# Update department
mutation {
  updateDepartment(id: "1", input: {
    name: "Updated Engineering"
    description: "New description"
  }) {
    id
    name
    description
  }
}

# Add employee
mutation {
  addEmployee(departmentId: "1", input: {
    name: "New Employee"
    role: "Developer"
    contact: "employee@company.com"
  }) {
    id
    name
    role
    contact
  }
}

# Delete employee
mutation {
  deleteEmployee(employeeId: "1")
}
```

## Project Structure

```
backend/
├── src/
│   ├── data/
│   │   └── departments.ts      # Static data
│   ├── resolvers/
│   │   └── department.resolver.ts  # GraphQL resolvers
│   ├── schema/
│   │   ├── department.schema.ts    # GraphQL types
│   │   └── inputs.ts               # GraphQL inputs
│   ├── app.module.ts
│   └── main.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Default Departments

The system comes pre-loaded with 5 departments:
1. Engineering (5 employees)
2. Human Resources (3 employees)
3. Marketing (4 employees)
4. Finance (3 employees)
5. Sales (4 employees)
