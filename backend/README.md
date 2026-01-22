# HR Management System - Backend

A NestJS GraphQL backend for managing HR departments and employees.

## Features

- 🚀 NestJS framework with GraphQL
- 📊 Department management (CRUD operations)
- 👥 Employee management within departments
- 🌍 Multi-language support (localization)
- 🔄 Real-time GraphQL playground
- ✅ TypeScript for type safety

## Prerequisites

- Node.js (>= 16.0.0)
- npm or yarn

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

## Running the Application

### Development mode
```bash
npm run start:dev
```

### Production mode
```bash
npm run build
npm run start:prod
```

The server will start on `http://localhost:3000/graphql`

## GraphQL Playground

Once the server is running, access the GraphQL playground at:
```
http://localhost:3000/graphql
```

## Available Queries

### Get a single department
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

### Get all departments
```graphql
query {
  getAllDepartments {
    id
    name
    description
    manager
    location
    employeesNumber
    status
  }
}
```

### Get employees of a department
```graphql
query {
  getEmployees(departmentId: "1") {
    id
    name
    role
    contact
  }
}
```

## Available Mutations

### Update department
```graphql
mutation {
  updateDepartment(
    id: "1"
    input: {
      name: "Updated Finance Department"
      description: "Updated description"
      manager: "Jane Doe"
      location: "HQ, New York office"
      status: true
      localization: {
        name: "المالية المحدثة"
        description: "وصف محدث"
      }
    }
  ) {
    id
    name
    description
    manager
    location
    localization {
      name
      description
    }
  }
}
```

### Add employee to department
```graphql
mutation {
  addEmployee(
    departmentId: "1"
    input: {
      name: "Sarah Johnson"
      role: "Financial Analyst"
      contact: "+1234567890"
    }
  ) {
    id
    name
    role
    contact
  }
}
```

### Delete employee from department
```graphql
mutation {
  deleteEmployee(departmentId: "1", employeeId: "11557")
}
```

## Project Structure

```
backend/
├── src/
│   ├── data/
│   │   └── department.json          # Static department data
│   ├── resolvers/
│   │   ├── department.resolver.ts   # Department GraphQL resolver
│   │   └── employee.resolver.ts     # Employee GraphQL resolver
│   ├── services/
│   │   └── department.service.ts    # Business logic for departments
│   ├── app.module.ts                # Main application module
│   ├── main.ts                      # Application entry point
│   └── schema.graphql               # GraphQL schema definition
├── package.json
├── tsconfig.json
└── README.md
```

## API Documentation

### Types

#### Department
- `id`: Unique identifier
- `name`: Department name
- `description`: Department description
- `localization`: Localized names (Arabic support)
- `code`: Department code
- `manager`: Manager name
- `location`: Physical location
- `employeesNumber`: Number of employees
- `status`: Active/inactive status
- `parentDepartment`: Parent department (if any)
- `createdAt`: Creation timestamp
- `employees`: List of employees

#### Employee
- `id`: Unique identifier
- `name`: Employee name
- `role`: Job role/title
- `contact`: Contact information

## Error Handling

The API includes proper error handling:
- 404 errors for non-existent departments/employees
- Validation errors for invalid inputs
- GraphQL error formatting

## CORS Configuration

CORS is enabled for all origins in development. Configure appropriately for production.

## Development

### Build the project
```bash
npm run build
```

### Format code
```bash
npm run format
```

### Lint code
```bash
npm run lint
```

## Technologies Used

- **NestJS**: Progressive Node.js framework
- **GraphQL**: Query language for APIs
- **Apollo Server**: GraphQL server implementation
- **TypeScript**: Type-safe JavaScript
- **Reflect Metadata**: Metadata reflection API

## License

MIT
