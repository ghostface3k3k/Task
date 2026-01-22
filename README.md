# Task - Department Management System

A full-stack department management application built with React, TypeScript, Material-UI, Tailwind CSS on the frontend and NestJS with GraphQL on the backend.

## Features

### Page 1 - Department Profile View
- Display comprehensive department profile information
- Sections include:
  - Basic Information (National ID, Title, Names, Date of birth, Gender, Nationality, Passport details, Marital Status)
  - Contact Information (Personal Email, Mobile)
  - Emergency Contacts
  - Address Details
  - Driving License Details
  - Military Status
- Edit button for each section

### Page 2 - Department Details & Employees
- Department overview with code, name (EN/AR), manager, location, employees count, status, creation date
- Assigned Employees table with:
  - ID, Employee Name, Role, Contact Information, KPI
  - Edit & Delete actions for each employee
- Delete functionality with confirmation modal
- Edit department details with form pre-populated with current data

## Tech Stack

### Frontend
- **React 19** with TypeScript
- **Material-UI (MUI)** for UI components
- **Tailwind CSS** for styling
- **Apollo Client** for GraphQL integration
- **React Router DOM** for navigation
- **React Hook Form** for form management
- **Vite** for build tooling

### Backend
- **NestJS** framework
- **GraphQL** with Apollo Server
- **TypeScript**
- Static JSON data storage
- CORS enabled for frontend communication

## Project Structure

```
Task/
├── backend/              # NestJS GraphQL API
│   ├── data/
│   │   └── department.json    # Static department data
│   ├── src/
│   │   ├── department/
│   │   │   ├── dto/
│   │   │   │   └── update-department.input.ts
│   │   │   ├── entities/
│   │   │   │   └── department.entity.ts
│   │   │   ├── department.module.ts
│   │   │   ├── department.resolver.ts
│   │   │   └── department.service.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   └── package.json
└── frontend/             # React TypeScript app
    ├── src/
    │   ├── apollo/
    │   │   └── client.ts        # Apollo Client setup
    │   ├── components/
    │   │   ├── DepartmentCard.tsx
    │   │   ├── DepartmentEdit.tsx
    │   │   ├── EmployeesList.tsx
    │   │   ├── EmployeeRow.tsx
    │   │   └── DeleteConfirmation.tsx
    │   ├── graphql/
    │   │   └── queries.ts       # GraphQL queries & mutations
    │   ├── pages/
    │   │   ├── ProfilePage.tsx  # Page 1
    │   │   └── DepartmentPage.tsx  # Page 2
    │   ├── types/
    │   │   └── index.ts         # TypeScript interfaces
    │   ├── App.tsx
    │   └── main.tsx
    └── package.json
```

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run start:dev
```

The backend will be available at `http://localhost:3000/graphql`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Running the Application

1. **Start the backend server first:**
   ```bash
   cd backend
   npm run start:dev
   ```

2. **In a new terminal, start the frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Access the application:**
   - Frontend: http://localhost:5173
   - GraphQL Playground: http://localhost:3000/graphql

## GraphQL API

### Queries

**Get Department:**
```graphql
query GetDepartment($id: String!) {
  getDepartment(id: $id) {
    id
    code
    nameEn
    nameAr
    manager
    location
    status
    createdAt
    profile {
      nationalId
      title
      firstName
      lastName
      # ... more fields
    }
    employees {
      id
      name
      role
      contactInfo
      kpi
    }
  }
}
```

**Get Department Employees:**
```graphql
query GetDepartmentEmployees($id: String!) {
  getDepartmentEmployees(id: $id) {
    id
    name
    role
    contactInfo
    kpi
  }
}
```

### Mutations

**Update Department:**
```graphql
mutation UpdateDepartment($id: String!, $input: UpdateDepartmentInput!) {
  updateDepartment(id: $id, input: $input) {
    id
    code
    nameEn
    nameAr
    manager
    location
    status
  }
}
```

**Delete Employee:**
```graphql
mutation DeleteEmployee($departmentId: String!, $employeeId: String!) {
  deleteEmployee(departmentId: $departmentId, employeeId: $employeeId)
}
```

## Features Implementation

### Performance Optimizations
- React.memo for component memoization
- useCallback for function memoization
- Efficient re-rendering strategies

### Code Quality
- TypeScript strict mode enabled
- Clean, maintainable code structure
- Proper error handling and loading states
- ESLint and Prettier configured

### Form Management
- React Hook Form for efficient form handling
- Form validation
- Pre-populated edit forms

### UI/UX
- Material-UI components for consistent design
- Tailwind CSS for custom styling
- Responsive design
- Loading indicators
- Error messages
- Confirmation dialogs

## Build for Production

### Backend
```bash
cd backend
npm run build
npm run start:prod
```

### Frontend
```bash
cd frontend
npm run build
# Serve the dist folder with your preferred static server
```

## License

ISC 
