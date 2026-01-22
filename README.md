"# HR Management System

A complete HR Management application built with React 18 + TypeScript (Frontend) and NestJS + GraphQL (Backend).

## Features

- ✅ **Authentication** - Email/password login with JWT
- ✅ **Dashboard** - Tab navigation for Departments and Employees
- ✅ **Department Management** - List, view, edit departments
- ✅ **Employee Management** - List, view, edit, delete employees
- ✅ **Department Details** - View department info and assigned employees
- ✅ **Employee Profile** - View employee details
- ✅ **Search & Filter** - Find departments and employees quickly
- ✅ **Responsive Design** - Works on all devices
- ✅ **GraphQL API** - Full CRUD operations
- ✅ **Static Data** - No database required (in-memory JSON data)

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** - Fast build tool
- **Tailwind CSS** + **Material-UI (MUI)** - Styling
- **React Hook Form** - Form validation
- **Apollo Client** - GraphQL client
- **React Router v6** - Navigation

### Backend
- **NestJS** - Progressive Node.js framework
- **GraphQL** - API with Apollo Server
- **TypeScript** - Type safety
- **In-memory Data** - No database (uses department.json)

## Project Structure

```
.
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── pages/         # Page components
│   │   │   ├── Login/
│   │   │   ├── Dashboard/
│   │   │   ├── DepartmentList/
│   │   │   ├── DepartmentDetails/
│   │   │   ├── DepartmentEdit/
│   │   │   ├── EmployeeList/
│   │   │   ├── EmployeeProfile/
│   │   │   └── EmployeeEdit/
│   │   ├── graphql/       # GraphQL queries & mutations
│   │   ├── styles/        # Global styles
│   │   ├── App.tsx        # Main app component with routing
│   │   └── main.tsx       # Entry point
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── tsconfig.json
│
├── backend/               # NestJS backend application
│   ├── src/
│   │   ├── auth/         # Authentication module
│   │   ├── departments/  # Department module
│   │   ├── employees/    # Employee module
│   │   ├── graphql/      # GraphQL schema & module
│   │   ├── data/         # Static JSON data
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── package.json
│   ├── nest-cli.json
│   └── tsconfig.json
│
└── README.md
```

## Setup Instructions

### Prerequisites
- **Node.js** 18+ and npm/yarn installed
- Terminal/Command Prompt

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the backend server:**
   ```bash
   npm run start:dev
   ```

   The GraphQL API will be available at: `http://localhost:4000/graphql`

### Frontend Setup

1. **Open a new terminal and navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

   The application will be available at: `http://localhost:5173`

## Usage

### Login
1. Open `http://localhost:5173` in your browser
2. Enter any email and password (mock authentication)
3. Click "Sign In"

### Dashboard
- **Departments Tab** - View all departments, click on any to see details
- **Employees Tab** - View all employees, click on any to see profile

### Department Details
- View department information
- See assigned employees
- Edit department (click Edit button)
- Remove employees from department

### Employee Profile
- View employee information
- Edit employee details (click Edit button)
- Delete employee (click Delete button)

### Search & Filter
- Use search boxes in lists to filter by name, role, contact, etc.

## GraphQL API

### GraphQL Playground
Visit `http://localhost:4000/graphql` to explore the API

### Sample Queries

**Get all departments:**
```graphql
query {
  departments {
    id
    name
    code
    manager
    location
    employeesNumber
    status
  }
}
```

**Get department details:**
```graphql
query {
  department(id: "1") {
    id
    name
    description
    manager
    location
    employees {
      id
      name
      role
      contact
    }
  }
}
```

**Get all employees:**
```graphql
query {
  employees {
    id
    name
    role
    contact
    departmentId
  }
}
```

### Sample Mutations

**Login:**
```graphql
mutation {
  login(email: "user@example.com", password: "password") {
    token
    user {
      id
      email
      name
    }
  }
}
```

**Update department:**
```graphql
mutation {
  updateDepartment(
    id: "1"
    input: {
      name: "Updated Finance Department"
      manager: "Jane Doe"
    }
  ) {
    id
    name
    manager
  }
}
```

**Update employee:**
```graphql
mutation {
  updateEmployee(
    id: "1"
    input: {
      name: "Updated Name"
      role: "Senior Manager"
    }
  ) {
    id
    name
    role
  }
}
```

**Delete employee:**
```graphql
mutation {
  deleteEmployeeRecord(id: "1") {
    success
    message
  }
}
```

## Key Features Implementation

### Authentication
- Mock JWT-based authentication
- Protected routes
- Token stored in localStorage

### Forms
- React Hook Form integration
- Client-side validation
- Error handling

### State Management
- Apollo Client cache
- Optimistic UI updates
- Auto-refetch after mutations

### Performance
- Code splitting
- Lazy loading
- Memoization where needed

### Responsive Design
- Mobile-first approach
- Tailwind CSS utilities
- Material-UI responsive components

## Development

### Build for Production

**Frontend:**
```bash
cd frontend
npm run build
```

**Backend:**
```bash
cd backend
npm run build
npm run start:prod
```

### Format Code
```bash
npm run format
```

## Notes

- **No Database Required** - All data is served from `backend/src/data/department.json`
- **In-Memory Storage** - Changes persist only during the session
- **Mock Authentication** - Any email/password will work
- **CORS Enabled** - Backend allows requests from frontend

## Troubleshooting

### Backend won't start
- Ensure port 4000 is not in use
- Check if all dependencies are installed
- Verify Node.js version (18+)

### Frontend won't start
- Ensure port 5173 is not in use
- Check if all dependencies are installed
- Verify backend is running

### GraphQL errors
- Ensure backend is running on port 4000
- Check browser console for errors
- Verify GraphQL playground is accessible

## License

MIT" 
