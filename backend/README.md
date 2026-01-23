# HR Management System - Backend

## Description
Backend API for HR Management System built with NestJS and GraphQL.

## Technologies
- **NestJS** - Progressive Node.js framework
- **GraphQL** - Query language for API
- **Apollo Server** - GraphQL server
- **TypeScript** - Type-safe development

## Prerequisites
- Node.js (v18 or higher)
- npm or yarn

## Installation

```bash
# Install dependencies
npm install
```

## Running the Application

```bash
# Development mode (with hot-reload)
npm run start:dev

# Production mode
npm run start:prod
```

The GraphQL Playground will be available at `http://localhost:4000/graphql`

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
    employees {
      id
      name
      role
      contact
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
    localization {
      name
      description
    }
    code
    manager
    location
    employeesNumber
    status
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

#### Get All Employees
```graphql
query {
  getEmployees {
    id
    name
    role
    contact
  }
}
```

#### Get Single Employee
```graphql
query {
  getEmployee(id: 11557) {
    id
    name
    role
    contact
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
      description: "New description"
      manager: "John Smith"
      location: "New York Office"
      status: true
    }
  ) {
    id
    name
    description
    manager
    location
    status
  }
}
```

#### Update Employee
```graphql
mutation {
  updateEmployee(
    departmentId: "1"
    employeeId: 11557
    input: {
      name: "Jane Updated Smith"
      role: "Senior Software Engineer"
      contact: "+1 555 999 8888"
    }
  ) {
    id
    name
    role
    contact
  }
}
```

#### Delete Employee
```graphql
mutation {
  deleteEmployee(departmentId: "1", employeeId: 11557)
}
```

## Project Structure

```
backend/
├── src/
│   ├── graphql/
│   │   ├── resolvers/
│   │   │   ├── department.resolver.ts
│   │   │   ├── employee.resolver.ts
│   │   │   └── auth.resolver.ts
│   │   ├── types/
│   │   │   ├── department.type.ts
│   │   │   ├── employee.type.ts
│   │   │   └── auth.type.ts
│   │   └── schema.graphql
│   ├── services/
│   │   ├── department.service.ts
│   │   ├── employee.service.ts
│   │   └── auth.service.ts
│   ├── data/
│   │   └── department.json
│   ├── app.module.ts
│   └── main.ts
├── package.json
├── tsconfig.json
└── nest-cli.json
```

## Authentication

The backend uses a dummy authentication system for demonstration purposes:
- **Email**: admin@hr.com
- **Password**: password123

## Data Storage

The application uses static data from `department.json` file. All updates are stored in memory and will be reset when the server restarts.

## Development

```bash
# Format code
npm run format

# Lint code
npm run lint
```

## License
MIT
