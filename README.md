# HR Management System

## Overview
Complete HR Management System with pixel-perfect Figma designs, featuring employee management, department management, and comprehensive profile views.

## Architecture
- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS + Apollo Client
- **Backend**: NestJS + GraphQL + Apollo Server
- **Data**: Static JSON data (in-memory)

## Features

### Employee Management
- ✅ Employee list view with search and filters
- ✅ Detailed employee profiles with multiple sections
- ✅ Contact information and emergency contacts
- ✅ Address and driving license details
- ✅ Military status tracking

### Department Management
- ✅ Department list with cards view
- ✅ Detailed department information
- ✅ Employee assignment and management
- ✅ Department editing with form validation
- ✅ Export functionality

### Design
- ✅ Pixel-perfect Figma implementation
- ✅ Poppins and Roboto fonts
- ✅ Consistent color scheme (#0f6bbc, #151d48, etc.)
- ✅ Responsive layouts
- ✅ Modern UI/UX

## Quick Start

### 1. Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Start Backend Server

```bash
cd backend
npm run start:dev
```

Backend will run on `http://localhost:4000/graphql`

### 3. Start Frontend Application

```bash
cd frontend
npm run dev
```

Frontend will run on `http://localhost:5173`

### 4. Login

Navigate to `http://localhost:5173/login` and use:
- **Email**: admin@hr.com
- **Password**: password123

## Project Structure

```
hr-management-system/
├── backend/
│   ├── src/
│   │   ├── graphql/
│   │   │   ├── resolvers/      # GraphQL resolvers
│   │   │   ├── types/          # TypeScript type definitions
│   │   │   └── schema.graphql  # GraphQL schema
│   │   ├── services/           # Business logic services
│   │   ├── data/               # Static JSON data
│   │   ├── app.module.ts       # Main NestJS module
│   │   └── main.ts             # Entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/              # Page components
│   │   ├── components/         # Reusable components
│   │   ├── graphql/            # GraphQL queries/mutations
│   │   ├── lib/                # Apollo Client setup
│   │   └── App.tsx             # Main app with routing
│   └── package.json
└── README.md
```

## Technology Stack

### Backend
- **NestJS** - Progressive Node.js framework
- **GraphQL** - Query language for APIs
- **Apollo Server** - GraphQL server implementation
- **TypeScript** - Type-safe development

### Frontend
- **React 18** - UI library with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS
- **Apollo Client** - GraphQL client
- **React Router** - Routing solution
- **React Hook Form** - Form management

## API Documentation

### GraphQL Playground
Access the GraphQL Playground at `http://localhost:4000/graphql` to explore the API.

### Key Queries
- `getDepartments` - Fetch all departments
- `getDepartment(id)` - Fetch single department
- `getEmployees` - Fetch all employees
- `getEmployee(id)` - Fetch single employee

### Key Mutations
- `login(email, password)` - Authenticate user
- `updateDepartment(id, input)` - Update department details
- `updateEmployee(departmentId, employeeId, input)` - Update employee
- `deleteEmployee(departmentId, employeeId)` - Remove employee from department

## Pages

1. **Login** (`/login`) - Authentication
2. **Dashboard** (`/dashboard`) - Main navigation hub
3. **Employees List** (`/employees`) - All employees table
4. **Employee Profile** (`/employees/:id`) - Detailed profile (Figma design)
5. **Departments List** (`/departments`) - All departments cards
6. **Department Details** (`/departments/:id`) - Detailed view (Figma design)
7. **Edit Department** (`/departments/:id/edit`) - Edit form

## Design System

### Colors
- Primary: `#0f6bbc`, `#003fad`
- Dark: `#151d48`, `#051d49`
- Light: `#fafafa`, `#f4f8fe`
- Gray: `#737791`, `#959fb0`, `#e7eaee`
- Accent: `#16c098`

### Typography
- **Poppins**: Weights 400, 500, 600 (headings, UI)
- **Roboto**: Weight 400 (body text)

### Components
- Custom sidebar navigation
- Reusable table component
- Header with breadcrumbs
- Form inputs with validation
- Cards and modals

## Development

### Backend Development
```bash
cd backend
npm run start:dev  # Watch mode with hot-reload
npm run build      # Build for production
```

### Frontend Development
```bash
cd frontend
npm run dev        # Development server
npm run build      # Build for production
npm run lint       # Run ESLint
```

## Testing

```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

## Documentation
- [Backend README](./backend/README.md) - Backend setup and API docs
- [Frontend README](./frontend/README.md) - Frontend setup and pages

## License
MIT