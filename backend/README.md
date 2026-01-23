# HR Management System - Backend

Backend API for the HR Management System built with NestJS and GraphQL.

## Technology Stack

- **Framework**: NestJS
- **API**: GraphQL with Apollo Server
- **Language**: TypeScript
- **Data**: Static JSON file (department.json)

## Features

- GraphQL API with queries and mutations
- Department management (CRUD operations)
- Employee management (CRUD operations)
- Authentication (dummy login)
- GraphQL Playground for API testing

## Prerequisites

- Node.js 18+ and npm

## Installation

```bash
npm install
```

## Running the Application

### Development Mode
```bash
npm run start:dev
```

The server will start at `http://localhost:4000`
GraphQL Playground will be available at `http://localhost:4000/graphql`

### Production Mode
```bash
npm run build
npm run start:prod
```

## GraphQL API

### Queries

#### Get All Departments
```graphql
query {
  getDepartments {
    id
    name
    description
    code
    manager
    location
    employeesNumber
    status
    createdAt
    localization {
      name
      description
    }
    employees {
      id
      name
      role
      contact
      kpi
    }
  }
}
```

#### Get Single Department
```graphql
query {
  getDepartment(id: "1") {
    id
    name
    description
    employees {
      id
      name
      role
      contact
      kpi
    }
  }
}
```

#### Get All Employees
```graphql
query {
  getEmployees {
    id
    name
    role
    contact
    kpi
  }
}
```

### Mutations

#### Login
```graphql
mutation {
  login(email: "admin@hr.com", password: "password123") {
    token
    user {
      id
      email
      name
    }
  }
}
```

#### Update Department
```graphql
mutation {
  updateDepartment(
    id: "1"
    input: {
      name: "Updated Finance Department"
      description: "Updated description"
      manager: "Jane Doe"
      location: "New York Office"
    }
  ) {
    id
    name
    description
    manager
    location
  }
}
```

#### Delete Employee
```graphql
mutation {
  deleteEmployee(departmentId: "1", employeeId: 11557)
}
```

#### Update Employee
```graphql
mutation {
  updateEmployee(
    departmentId: "1"
    employeeId: 11555
    input: { name: "Updated Name", role: "Senior Manager" }
  ) {
    id
    name
    role
    contact
    kpi
  }
}
```

## Project Structure

```
backend/
├── src/
│   ├── auth/                 # Authentication module
│   │   ├── auth.model.ts     # User & AuthPayload types
│   │   ├── auth.service.ts   # Authentication logic
│   │   ├── auth.resolver.ts  # GraphQL auth resolver
│   │   └── auth.module.ts    # Auth module
│   ├── departments/          # Departments module
│   │   ├── department.model.ts   # Department & Employee types
│   │   ├── department.input.ts   # Input types for mutations
│   │   ├── departments.service.ts # Business logic
│   │   ├── departments.resolver.ts # GraphQL resolver
│   │   └── departments.module.ts  # Departments module
│   ├── data/
│   │   └── department.json   # Static data
│   ├── app.module.ts         # Root application module
│   ├── main.ts               # Application entry point
│   └── schema.gql            # Generated GraphQL schema
├── package.json
├── tsconfig.json
└── nest-cli.json
```

## Default Credentials

- **Email**: admin@hr.com
- **Password**: password123

## CORS Configuration

The backend is configured to allow requests from:
- http://localhost:5173 (Vite dev server)
- http://localhost:3000 (Alternative frontend port)

## Data

The application uses static data from `src/data/department.json` with 5 departments and their employees.

## Building for Production

```bash
npm run build
```

The compiled output will be in the `dist/` directory.

## Notes

- This is a static data implementation (no database)
- Data changes are kept in memory and reset on server restart
- Authentication is implemented with dummy credentials for demonstration
- GraphQL Playground is enabled for easy API testing
