# Department Management System

A complete full-stack application for managing departments and employees with pixel-perfect Figma design implementation.

## Features

### Backend (NestJS + GraphQL)
- **GraphQL API** with Apollo Server
- **Static data** from JSON files
- **CORS enabled** for localhost:5173
- **TypeScript strict mode**
- **Queries**:
  - `department(id: ID!)` - Get department details
  - `departmentEmployees(id: ID!)` - Get department employees
  - `employee(id: ID!)` - Get employee profile
- **Mutations**:
  - `updateDepartment(id: ID!, input: UpdateDepartmentInput!)` - Update department
  - `deleteEmployee(departmentId: ID!, employeeId: ID!)` - Delete employee

### Frontend (React + TypeScript + Tailwind CSS)
- **Page 1: Employee Profile View**
  - Sidebar navigation with icons
  - Top header with notifications and user menu
  - Profile card sidebar with avatar, name, role, and tabs
  - Responsive grid layout for personal information
  - Sections with Edit buttons:
    - Basic Information (National ID, Names, DoB, Gender, etc.)
    - Contact Information
    - Emergency Contacts
    - Address Details
    - Driving License Details
    - Military Status
  - Breadcrumb navigation

- **Page 2: Department Details & Employees**
  - Department overview card with:
    - Active status badge
    - Department information (Code, Name EN/AR, Manager, Location, etc.)
    - Edit and Export buttons
  - Assigned Employees table with:
    - ID, Name, Role, Contact, KPI with progress bar
    - Edit & Delete actions with icons
    - Alternating row colors
  - Delete confirmation modal

### Technical Implementation
- ✅ Pixel-perfect Figma design match using Tailwind CSS
- ✅ Performance optimized (React.memo, useCallback)
- ✅ Clean code structure
- ✅ Full GraphQL integration with Apollo Client
- ✅ React Hook Form ready for forms
- ✅ TypeScript strict mode
- ✅ ESLint and Prettier configured
- ✅ Proper error handling and loading states
- ✅ Responsive design
- ✅ Accessible components

## Project Structure

```
Task/
├── backend/                 # NestJS GraphQL API
│   ├── src/
│   │   ├── department/     # Department module
│   │   ├── employee/       # Employee module
│   │   ├── data.json       # Static data
│   │   ├── app.module.ts   # Main app module
│   │   └── main.ts         # Entry point
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/               # React TypeScript app
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   │   └── layout/     # Layout components
│   │   ├── pages/          # Page components
│   │   ├── graphql/        # GraphQL client & queries
│   │   ├── utils/          # TypeScript types
│   │   ├── App.tsx         # Main app component
│   │   └── main.tsx        # Entry point
│   ├── package.json
│   └── tailwind.config.js
│
└── README.md
```

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Installation

### Backend Setup

```bash
cd backend
npm install
```

### Frontend Setup

```bash
cd frontend
npm install
```

## Running the Application

### Start Backend Server

```bash
cd backend
npm run dev
```

The GraphQL server will start at `http://localhost:4000/graphql`

### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will start at `http://localhost:5173`

## Building for Production

### Build Backend

```bash
cd backend
npm run build
npm start
```

### Build Frontend

```bash
cd frontend
npm run build
npm run preview
```

## API Documentation

### GraphQL Playground

Visit `http://localhost:4000/graphql` to access the GraphQL Playground.

### Example Queries

**Get Department:**
```graphql
query GetDepartment($id: ID!) {
  department(id: $id) {
    name
    description
    localization { name description }
    code
    manager
    location
    employeesNumber
    status
    parentDepartment { id name }
    createdAt
  }
}
```

**Get Employee:**
```graphql
query GetEmployee($id: ID!) {
  employee(id: $id) {
    id
    firstName
    lastName
    email
    mobile
    role
    avatar
  }
}
```

**Delete Employee:**
```graphql
mutation DeleteEmployee($departmentId: ID!, $employeeId: ID!) {
  deleteEmployee(departmentId: $departmentId, employeeId: $employeeId)
}
```

## Available Scripts

### Backend
- `npm run dev` - Start development server with ts-node
- `npm run build` - Build the application
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Technologies Used

### Backend
- NestJS
- GraphQL
- Apollo Server
- TypeScript
- Reflect Metadata
- RxJS

### Frontend
- React 19
- TypeScript
- Tailwind CSS
- Apollo Client
- React Router
- React Hook Form
- Heroicons
- Vite

## Code Quality

- **TypeScript Strict Mode**: Enabled for both frontend and backend
- **ESLint**: Configured with TypeScript rules
- **Prettier**: Code formatting
- **Performance**: React.memo and useCallback optimizations

## Features Highlights

1. **Responsive Design**: Works on all screen sizes
2. **Loading States**: Proper loading indicators
3. **Error Handling**: User-friendly error messages
4. **Type Safety**: Full TypeScript coverage
5. **Code Organization**: Clean, modular structure
6. **Performance**: Optimized React components
7. **Accessibility**: Semantic HTML and ARIA labels
8. **Modern UI**: Tailwind CSS with custom design system

## License

MIT
