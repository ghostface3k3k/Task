# HR Management System - Frontend

Modern frontend application for the HR Management System built with React, TypeScript, Material-UI, and Tailwind CSS.

## Technology Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **UI Library**: Material-UI (MUI) v5
- **Styling**: Tailwind CSS v3
- **State Management**: Apollo Client for GraphQL
- **Routing**: React Router v6
- **Forms**: React Hook Form
- **API**: GraphQL with Apollo Client

## Features

### Pages Implemented
1. **Login Page** - Secure authentication with dummy credentials
2. **Dashboard** - Quick navigation to Employees and Departments
3. **Departments List** - Card view of all departments with key information
4. **Department Details** - Detailed view with assigned employees table
5. **Edit Department** - Form to edit department information with validation
6. **Employees List** - Table view of all employees across departments
7. **Employee Profile** - Placeholder for detailed employee information

### Key Features
- **Authentication**: Login/logout with JWT token storage
- **Responsive Design**: Mobile-first design that works on all devices
- **Material Design**: Beautiful UI using Material-UI components
- **Tailwind Utilities**: Custom styling with Tailwind CSS utilities
- **GraphQL Integration**: Real-time data fetching with Apollo Client
- **Form Validation**: React Hook Form with validation rules
- **Data Export**: Export employee lists to CSV
- **CRUD Operations**: Complete Create, Read, Update, Delete functionality
- **Breadcrumb Navigation**: Easy navigation through the app
- **Loading States**: Skeleton screens and loading indicators
- **Error Handling**: User-friendly error messages

## Design Tokens

### Colors
- **Primary**: #0f6bbc (Main blue)
- **Primary Dark**: #003fad (Dark blue)
- **Accent**: #16c098 (Green)
- **Background**: #fafafa (Light gray)
- **Text Primary**: #151d48 (Dark blue-gray)
- **Text Secondary**: #737791 (Gray)

### Typography
- **Font Families**: Poppins (400, 500, 600), Roboto (400)
- **Headings**: Poppins Semi-Bold
- **Body**: Poppins Regular

### Spacing & Layout
- **Border Radius**: 4px, 8px, 16px, 20px, 24px
- **Box Shadow**: 0 4px 20px rgba(237, 237, 237, 0.5)
- **Responsive Breakpoints**: Mobile, Tablet, Desktop

## Prerequisites

- Node.js 18+ and npm
- Backend server running on http://localhost:4000

## Installation

```bash
npm install
```

## Running the Application

### Development Mode
```bash
npm run dev
```

The application will start at `http://localhost:5173`

### Production Build
```bash
npm run build
npm run preview
```

## Default Credentials

- **Email**: admin@hr.com
- **Password**: password123

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   └── Layout/
│   │       └── Layout.tsx           # Main layout with sidebar
│   ├── pages/
│   │   ├── Login/
│   │   │   └── Login.tsx            # Login page
│   │   ├── Dashboard/
│   │   │   └── Dashboard.tsx        # Dashboard page
│   │   ├── Departments/
│   │   │   ├── DepartmentsList.tsx  # List of departments
│   │   │   ├── DepartmentDetails.tsx # Department details
│   │   │   └── EditDepartment.tsx   # Edit department
│   │   └── Employees/
│   │       ├── EmployeesList.tsx    # List of employees
│   │       └── EmployeeProfile.tsx  # Employee profile
│   ├── lib/
│   │   ├── apollo/
│   │   │   └── client.ts            # Apollo Client setup
│   │   ├── auth/
│   │   │   └── AuthContext.tsx      # Authentication context
│   │   └── graphql/
│   │       └── queries.ts           # GraphQL queries/mutations
│   ├── types/
│   │   └── index.ts                 # TypeScript type definitions
│   ├── App.tsx                      # Main app with routing
│   ├── main.tsx                     # Application entry point
│   └── index.css                    # Global styles
├── index.html
├── package.json
├── tailwind.config.js               # Tailwind configuration
├── postcss.config.js                # PostCSS configuration
├── tsconfig.json                    # TypeScript configuration
└── vite.config.ts                   # Vite configuration
```

## Available Routes

| Route | Description | Protected |
|-------|-------------|-----------|
| `/login` | Login page | No |
| `/dashboard` | Main dashboard | Yes |
| `/departments` | Departments list | Yes |
| `/departments/:id` | Department details | Yes |
| `/departments/:id/edit` | Edit department | Yes |
| `/employees` | Employees list | Yes |
| `/employees/:id` | Employee profile | Yes |

## GraphQL Operations

### Queries
- `getDepartments` - Fetch all departments
- `getDepartment(id)` - Fetch single department
- `getEmployees` - Fetch all employees

### Mutations
- `login(email, password)` - User authentication
- `updateDepartment(id, input)` - Update department
- `deleteEmployee(departmentId, employeeId)` - Delete employee
- `updateEmployee(departmentId, employeeId, input)` - Update employee

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
