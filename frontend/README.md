# HR Management System - Frontend

## Description
Modern, pixel-perfect frontend for HR Management System built with React 18, TypeScript, Vite, and Tailwind CSS.

## Technologies
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Apollo Client** - GraphQL client for API communication
- **React Router** - Client-side routing
- **React Hook Form** - Form validation and management

## Design System
- **Fonts**: Poppins (400, 500, 600), Roboto (400)
- **Primary Colors**: #0f6bbc, #003fad
- **Dark Colors**: #151d48, #051d49
- **Light Colors**: #fafafa, #f4f8fe
- **Gray Colors**: #737791, #959fb0, #e7eaee
- **Accent Color**: #16c098

## Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Backend server running on http://localhost:4000

## Installation

```bash
# Install dependencies
npm install
```

## Running the Application

```bash
# Development mode (with hot-reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will be available at `http://localhost:5173`

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Sidebar.tsx         # Navigation sidebar
│   │   ├── Header.tsx          # Page header with breadcrumbs
│   │   └── Table.tsx           # Reusable table component
│   ├── pages/
│   │   ├── Login.tsx                    # Login page
│   │   ├── Dashboard.tsx                # Main dashboard
│   │   ├── EmployeesList.tsx            # Employees list view
│   │   ├── DepartmentsList.tsx          # Departments list view
│   │   ├── UserProfileInformation.tsx   # Employee profile (FIGMA)
│   │   ├── ViewDepartmentDetails.tsx    # Department details (FIGMA)
│   │   └── EditDepartment.tsx           # Edit department form
│   ├── graphql/
│   │   └── queries.ts          # GraphQL queries and mutations
│   ├── lib/
│   │   └── apollo.ts           # Apollo Client configuration
│   ├── App.tsx                 # Main app component with routing
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── tsconfig.json
```

## Pages

### 1. Login Page (`/login`)
- Email/Password authentication form
- Dummy credentials: `admin@hr.com` / `password123`
- Redirects to dashboard on success

### 2. Dashboard (`/dashboard`)
- Navigation cards for Employees and Departments
- Quick access to main sections

### 3. Employees List (`/employees`)
- Table view of all employees
- Columns: ID, Name, Role, Contact, Actions
- Click row to view employee profile

### 4. Departments List (`/departments`)
- Card-based view of departments
- Shows: Name, Code, Manager, Location, Employee Count, Status
- Click card to view department details

### 5. User Profile Information (`/employees/:id`)
- **PIXEL-PERFECT FIGMA DESIGN**
- Sidebar navigation
- Profile card with avatar and tabs
- Information sections:
  - Basic Information
  - Contact Information
  - Emergency Contacts
  - Address Details
  - Driving License Details
  - Military Status
- Edit buttons on each section

### 6. View Department Details (`/departments/:id`)
- **PIXEL-PERFECT FIGMA DESIGN**
- Sidebar navigation
- Department header with status badge
- Export & Edit buttons
- Department information fields
- Assigned Employees table with:
  - ID, Employee Name, Role, Contact, KPI, Actions
- Employee management (View/Remove)

### 7. Edit Department (`/departments/:id/edit`)
- Form to edit department details
- Fields: Name, Description, Manager, Location, Status
- Validation with React Hook Form
- GraphQL mutation on save

## Authentication

The application uses localStorage to store authentication tokens:
- Token stored after successful login
- User data cached locally
- Logout clears storage

**Demo Credentials:**
- Email: `admin@hr.com`
- Password: `password123`

## GraphQL Integration

The frontend connects to the backend GraphQL API at `http://localhost:4000/graphql`

### Available Queries:
- `getDepartments` - Get all departments
- `getDepartment(id)` - Get single department
- `getEmployees` - Get all employees
- `getEmployee(id)` - Get single employee

### Available Mutations:
- `login(email, password)` - Authenticate user
- `updateDepartment(id, input)` - Update department
- `updateEmployee(departmentId, employeeId, input)` - Update employee
- `deleteEmployee(departmentId, employeeId)` - Remove employee

## Development

```bash
# Run linter
npm run lint

# Build TypeScript
npm run build
```

## Features

✅ Modern React 18 with TypeScript
✅ Responsive design with Tailwind CSS
✅ Pixel-perfect Figma implementation
✅ Apollo Client for GraphQL
✅ React Router for navigation
✅ React Hook Form for forms
✅ Type-safe development
✅ Fast development with Vite HMR
✅ Component-based architecture
✅ Reusable UI components

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License
MIT
