"# HR Management System - Full Stack Application

A complete HR Management System built with React, TypeScript, NestJS, and GraphQL.

## 🚀 Features

### Frontend
- **Authentication**: Login with credentials (HR/HR) stored in localStorage
- **Protected Routes**: Dashboard accessible only when authenticated
- **Departments Management**:
  - View all departments with details (Code, Name, Arabic localization, Manager, Location, Status)
  - Edit department information via modal dialog
  - Delete departments (with confirmation)
- **Employees Management**:
  - View employees by department
  - Add new employees via modal dialog
  - Delete employees (with confirmation)
- **Form Validation**: React Hook Form with real-time validation
- **Professional UI**: Material-UI components with Tailwind CSS styling
- **GraphQL Integration**: Apollo Client for seamless API communication

### Backend
- **GraphQL API**: Apollo Server with code-first schema
- **Static Data**: Pre-populated departments and employees
- **CORS Enabled**: Ready for frontend integration
- **Type-Safe**: Full TypeScript implementation

## 📸 Screenshots

### Login Page
![Login](https://github.com/user-attachments/assets/3756039f-7375-4282-923b-e5729128070c)

### Departments Dashboard
![Departments](https://github.com/user-attachments/assets/635b2293-b40c-44db-8f58-3247a1dbdf9f)

### Employees Dashboard
![Employees](https://github.com/user-attachments/assets/0f50d690-fae8-40e3-979b-12b408b2241f)

### Edit Department Modal
![Edit Department](https://github.com/user-attachments/assets/0cdf96d9-477b-4aa4-b6e9-abde68f90b9a)

### Add Employee Modal
![Add Employee](https://github.com/user-attachments/assets/fef6ccf9-2fa6-4543-9ae6-7978d2690f88)

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript 5** - Type safety
- **Vite** - Build tool and dev server
- **Material-UI (MUI) v5** - Component library
- **Tailwind CSS** - Utility-first CSS
- **React Router v6** - Client-side routing
- **Apollo Client** - GraphQL client
- **React Hook Form** - Form validation

### Backend
- **NestJS 11** - Backend framework
- **GraphQL** - API query language
- **Apollo Server** - GraphQL server
- **TypeScript 5** - Type safety

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Backend Setup

```bash
cd backend
npm install --legacy-peer-deps
npm run build
npm run start:dev
```

The backend server will start at `http://localhost:4000`

GraphQL Playground: `http://localhost:4000/graphql`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will start at `http://localhost:3000`

## 🔑 Default Credentials

- **Username**: `HR`
- **Password**: `HR`

## 📁 Project Structure

```
/
├── backend/                 # NestJS GraphQL backend
│   ├── src/
│   │   ├── data/           # Static data (departments, employees)
│   │   ├── resolvers/      # GraphQL resolvers
│   │   ├── schema/         # GraphQL schema definitions
│   │   ├── app.module.ts   # Main app module
│   │   └── main.ts         # Entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
├── frontend/               # React TypeScript frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── graphql/        # GraphQL client & queries
│   │   ├── hooks/          # Custom hooks
│   │   ├── App.tsx         # Main app component
│   │   └── main.tsx        # Entry point
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── README.md
│
└── README.md               # This file
```

## 🎯 Key Features Implementation

### Authentication
- Simple localStorage-based authentication
- Protected routes using React Router
- Logout functionality

### GraphQL API

**Queries:**
- `getAllDepartments` - Get all departments with employees
- `getDepartment(id)` - Get single department by ID
- `getEmployees(departmentId)` - Get employees by department

**Mutations:**
- `updateDepartment(id, input)` - Update department details
- `deleteEmployee(employeeId)` - Delete an employee
- `addEmployee(departmentId, input)` - Add new employee

### Static Data

The system comes pre-loaded with 5 departments:
1. **Engineering** - 5 employees
2. **Human Resources** - 3 employees
3. **Marketing** - 4 employees
4. **Finance** - 3 employees
5. **Sales** - 4 employees

Each department includes:
- Code, Name, Arabic localization
- Description, Manager, Location
- Employee count and status
- List of employees with roles and contacts

## 🚦 Running Tests

Backend:
```bash
cd backend
npm run build
```

Frontend:
```bash
cd frontend
npm run build
```

## 📝 API Examples

### Query All Departments
```graphql
query {
  getAllDepartments {
    id
    name
    code
    employees {
      id
      name
      role
    }
  }
}
```

### Update Department
```graphql
mutation {
  updateDepartment(id: "1", input: {
    name: "Updated Engineering"
    manager: "New Manager"
  }) {
    id
    name
    manager
  }
}
```

### Add Employee
```graphql
mutation {
  addEmployee(departmentId: "1", input: {
    name: "New Employee"
    role: "Developer"
    contact: "employee@company.com"
  }) {
    id
    name
    role
  }
}
```

## 🔧 Development

### Backend Development
```bash
cd backend
npm run start:dev  # Watch mode with auto-reload
```

### Frontend Development
```bash
cd frontend
npm run dev  # Hot module replacement
```

## 📚 Additional Information

- Both backend and frontend have their own detailed README files
- The system uses static data (no database required)
- CORS is enabled for cross-origin requests
- All forms include validation with helpful error messages
- Material-UI provides a consistent, professional look
- Arabic localization is included for department names

## 🤝 Contributing

This is a demonstration project showing a complete full-stack HR management system with modern technologies.

## 📄 License

This project is for demonstration purposes.
" 
