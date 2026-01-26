# HR Department Management System - Backend

A NestJS GraphQL API for managing HR departments and employees.

## Technology Stack

- **NestJS** - Progressive Node.js framework
- **GraphQL** - Query language for the API
- **Apollo Server** - GraphQL server implementation
- **TypeScript** - Type-safe development

## Features

- GraphQL API with queries and mutations
- Department management (get, update)
- Employee management (add, delete)
- Static in-memory data storage
- CORS enabled for frontend integration
- GraphQL Playground for testing

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` file if needed:
```
PORT=3000
FRONTEND_URL=http://localhost:5173
```

## Running the Application

### Development Mode (with hot reload)
```bash
npm run start:dev
```

### Production Mode
```bash
npm run build
npm run start:prod
```

The server will start on `http://localhost:3000`

## GraphQL Playground

Once the server is running, access the GraphQL Playground at:
```
http://localhost:3000/graphql
```

## API Documentation

### Queries

#### Get Department
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

### Mutations

#### Update Department
```graphql
mutation {
  updateDepartment(
    id: "1"
    input: {
      name: "Updated HR Department"
      description: "Updated description"
      manager: "New Manager"
    }
  ) {
    id
    name
    description
    manager
  }
}
```

#### Add Employee
```graphql
mutation {
  addEmployee(
    departmentId: "1"
    input: {
      name: "Jane Doe"
      role: "HR Assistant"
      contact: "jane.doe@company.com"
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
  deleteEmployee(departmentId: "1", employeeId: 1)
}
```

## Project Structure

```
backend/
├── src/
│   ├── department/
│   │   ├── department.module.ts      # Department module
│   │   ├── department.service.ts     # Business logic and data management
│   │   └── department.resolver.ts    # GraphQL resolvers
│   ├── types/
│   │   └── department.types.ts       # GraphQL types and input types
│   ├── app.module.ts                 # Main application module
│   └── main.ts                       # Application entry point
├── .env.example                      # Environment variables template
├── package.json                      # Dependencies and scripts
└── README.md                         # This file
```

## Data Structure

### Department Object
- `id`: Unique identifier
- `name`: Department name
- `description`: Department description
- `localization`: Arabic translations
  - `name`: Arabic name
  - `description`: Arabic description
- `code`: Department code (number)
- `manager`: Manager name
- `location`: Physical location
- `employeesNumber`: Number of employees
- `status`: Active/Inactive (boolean)
- `parentDepartment`: Parent department reference (nullable)
- `createdAt`: Creation timestamp (ISO 8601)
- `employees`: Array of employee objects

### Employee Object
- `id`: Unique identifier
- `name`: Employee name
- `role`: Job role/title
- `contact`: Contact information (email)

## Development

### Build
```bash
npm run build
```

### Run Tests
```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

### Linting
```bash
npm run lint
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:5173` |

## Notes

- This application uses in-memory storage, so data resets on server restart
- The default department has ID "1" with 5 employees
- CORS is enabled to allow frontend integration
- GraphQL Playground is enabled for easy API testing

## Support

For issues or questions, please open an issue in the repository.
