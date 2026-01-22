# Quick Start Guide

## Prerequisites
- Node.js v18+
- PostgreSQL v13+
- npm or yarn

## Setup Instructions

### 1. Database Setup
```bash
# Install PostgreSQL if not already installed
# macOS: brew install postgresql
# Ubuntu: sudo apt-get install postgresql

# Start PostgreSQL service
# macOS: brew services start postgresql
# Ubuntu: sudo service postgresql start

# Create database
psql -U postgres
CREATE DATABASE hr_management;
\q
```

### 2. Backend Setup
```bash
cd backend
npm install

# The .env file is already configured with default values
# Edit if needed: nano .env

# Start backend server
npm run start:dev
```

Backend will run on: http://localhost:4000/graphql

### 3. Frontend Setup
Open a new terminal:
```bash
cd frontend
npm install

# Start frontend development server
npm run dev
```

Frontend will run on: http://localhost:5173

## First Time Use

### Create Admin User
1. Open http://localhost:4000/graphql
2. Run this mutation:
```graphql
mutation {
  register(
    email: "admin@example.com"
    password: "password123"
    role: "admin"
  ) {
    access_token
    user {
      id
      email
      role
    }
  }
}
```

### Login to Application
1. Open http://localhost:5173
2. Login with:
   - Email: admin@example.com
   - Password: password123

### Create Sample Data

#### Create Department
```graphql
mutation {
  createDepartment(createDepartmentInput: {
    name: "Engineering"
    code: "ENG"
    manager: "John Smith"
    location: "San Francisco"
  }) {
    id
    name
    code
  }
}
```

Copy the department `id` from the response.

#### Create Employee
```graphql
mutation {
  createEmployee(createEmployeeInput: {
    firstName: "Jane"
    lastName: "Doe"
    email: "jane.doe@company.com"
    phone: "+1-555-0123"
    dateOfBirth: "1990-05-15"
    position: "Senior Software Engineer"
    departmentId: "PASTE_DEPARTMENT_ID_HERE"
  }) {
    id
    firstName
    lastName
    email
  }
}
```

#### Create More Employees
```graphql
mutation {
  createEmployee(createEmployeeInput: {
    firstName: "John"
    lastName: "Smith"
    email: "john.smith@company.com"
    phone: "+1-555-0124"
    dateOfBirth: "1985-03-20"
    position: "Engineering Manager"
    departmentId: "PASTE_DEPARTMENT_ID_HERE"
  }) {
    id
    firstName
    lastName
  }
}
```

#### Create Another Department
```graphql
mutation {
  createDepartment(createDepartmentInput: {
    name: "Human Resources"
    code: "HR"
    manager: "Sarah Johnson"
    location: "New York"
  }) {
    id
    name
    code
  }
}
```

## Testing the Application

1. **Dashboard**: View overview statistics and quick actions
2. **Employees Tab**: Navigate to employee directory
3. **Search**: Filter employees by name or email
4. **View Profile**: Click on any employee to see detailed profile
5. **Departments**: Browse all departments and their employees
6. **Department Details**: Click on a department to see employee table

## Troubleshooting

### Backend won't start
- Check if PostgreSQL is running: `pg_isready`
- Verify database exists: `psql -U postgres -l | grep hr_management`
- Check .env file configuration

### Frontend won't connect
- Ensure backend is running on port 4000
- Check CORS settings in backend/.env
- Clear browser cache and localStorage

### Authentication issues
- Check JWT_SECRET is set in backend/.env
- Clear localStorage in browser (F12 > Application > Local Storage)
- Verify user was created successfully

## Development URLs

- **Frontend**: http://localhost:5173
- **Backend GraphQL Playground**: http://localhost:4000/graphql
- **API Endpoint**: http://localhost:4000/graphql

## Features to Explore

1. **Authentication**: Secure JWT-based login
2. **Employee Management**: Full CRUD with search and filter
3. **Department Management**: Organize employees by department
4. **Profile Views**: Detailed employee and department pages
5. **Responsive Design**: Works on mobile, tablet, and desktop
6. **Real-time Updates**: GraphQL queries with Apollo Client

## Next Steps

- Add more employees and departments
- Explore the GraphQL API in the playground
- Customize the UI in frontend/src/pages/
- Add custom business logic in backend/src/
- Deploy to production (see README.md)

## Support

For issues or questions:
- Check the main README.md
- Review GraphQL schema at http://localhost:4000/graphql
- Check browser console for frontend errors
- Check terminal output for backend errors
