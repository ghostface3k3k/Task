# HR Management System - Frontend

Frontend application for HR Management System built with React, TypeScript, and Material-UI.

## Features

- User authentication with localStorage
- Protected routes
- Department management (view, edit, delete)
- Employee management (view, add, delete)
- Modal dialogs for editing and adding
- Form validation with React Hook Form
- GraphQL integration with Apollo Client
- Professional UI with Material-UI and Tailwind CSS

## Tech Stack

- React 18
- TypeScript 5
- Vite (build tool)
- Material-UI (MUI) v5
- Tailwind CSS
- React Router v6
- Apollo Client (GraphQL)
- React Hook Form

## Installation

```bash
npm install
```

## Running the Application

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will start at `http://localhost:3000`

## Default Credentials

- Username: `HR`
- Password: `HR`

## Features Overview

### Login Page
- Simple form with username and password
- Form validation
- Error messages for invalid credentials
- Redirects to dashboard on successful login

### Dashboard
- Two main sections: Departments and Employees
- Tab navigation between sections
- Logout functionality

### Departments Section
- View all departments in a table
- Edit department details via modal dialog
- Delete departments (with confirmation)
- Display department information:
  - Code, Name (with Arabic localization)
  - Description
  - Manager, Location
  - Number of employees
  - Status (Active/Inactive)

### Employees Section
- Select department from dropdown
- View all employees in selected department
- Add new employees via modal dialog
- Delete employees (with confirmation)
- Display employee information:
  - ID, Name, Role, Contact

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── DepartmentsSection.tsx
│   │   ├── EmployeesSection.tsx
│   │   ├── EditDepartmentModal.tsx
│   │   ├── AddEmployeeModal.tsx
│   │   └── ProtectedRoute.tsx
│   ├── pages/
│   │   ├── Login.tsx
│   │   └── Dashboard.tsx
│   ├── graphql/
│   │   ├── client.ts
│   │   └── queries.ts
│   ├── hooks/
│   │   └── useAuth.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

## GraphQL Integration

The frontend connects to the GraphQL backend at `http://localhost:4000/graphql`.

Make sure the backend server is running before starting the frontend.

### Queries Used
- `getAllDepartments` - Fetch all departments with employees
- `getDepartment` - Fetch single department by ID
- `getEmployees` - Fetch employees by department ID

### Mutations Used
- `updateDepartment` - Update department details
- `deleteEmployee` - Delete an employee
- `addEmployee` - Add new employee to department

## Authentication

- Authentication uses localStorage to persist login state
- Protected routes redirect to login if not authenticated
- Logout clears authentication state and redirects to login

## Form Validation

All forms use React Hook Form for:
- Required field validation
- Email format validation
- Real-time error messages
- Controlled form state
