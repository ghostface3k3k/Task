"# HR Management System

Complete full-stack HR Management System with GraphQL API, built with NestJS backend and React frontend.

## 🚀 Features

### Backend (NestJS + GraphQL)
- ✅ GraphQL API with Apollo Server
- ✅ Department management
- ✅ Employee management
- ✅ Static data persistence (JSON-based)
- ✅ CORS enabled for frontend
- ✅ GraphQL Playground for testing

### Frontend (React + TypeScript + MUI + Tailwind)
- ✅ Modern React 18+ with TypeScript
- ✅ Material-UI components
- ✅ Tailwind CSS styling
- ✅ Authentication (Login/Logout)
- ✅ Protected routes
- ✅ Department view and edit
- ✅ Employee table with delete functionality
- ✅ React Hook Form validation
- ✅ Apollo Client GraphQL integration
- ✅ Performance optimizations (React.memo, useCallback, useMemo)
- ✅ Lazy loading routes
- ✅ Responsive design
- ✅ Professional UI/UX

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn

## 🛠️ Installation

### Clone the repository
```bash
git clone <repository-url>
cd Task
```

### Install Backend Dependencies
```bash
cd backend
npm install
```

### Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

## 🏃 Running the Application

### 1. Start the Backend Server

```bash
cd backend
npm run dev
```

The backend will start on http://localhost:3000
GraphQL Playground: http://localhost:3000/graphql

### 2. Start the Frontend

In a new terminal:

```bash
cd frontend
npm run dev
```

The frontend will start on http://localhost:5173

## 🔐 Login Credentials

- **Username:** HR
- **Password:** HR

## 📚 API Documentation

### GraphQL Endpoint
```
http://localhost:3000/graphql
```

### Sample Queries

#### Get Department
```graphql
query GetDepartment($id: ID!) {
  department(id: $id) {
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

Variables:
```json
{
  "id": "1"
}
```

#### Update Department
```graphql
mutation UpdateDepartment($id: ID!, $input: UpdateDepartmentInput!) {
  updateDepartment(id: $id, input: $input) {
    id
    name
    status
  }
}
```

Variables:
```json
{
  "id": "1",
  "input": {
    "name": "Updated Department",
    "status": true
  }
}
```

#### Delete Employee
```graphql
mutation DeleteEmployee($departmentId: ID!, $employeeId: ID!) {
  deleteEmployee(departmentId: $departmentId, employeeId: $employeeId)
}
```

Variables:
```json
{
  "departmentId": "1",
  "employeeId": "11557"
}
```

## 📁 Project Structure

```
Task/
├── backend/                  # NestJS GraphQL Backend
│   ├── src/
│   │   ├── data/
│   │   │   └── department.json
│   │   ├── resolvers/
│   │   │   ├── department.resolver.ts
│   │   │   └── employee.resolver.ts
│   │   ├── services/
│   │   │   └── department.service.ts
│   │   ├── schema.graphql
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
├── frontend/                 # React TypeScript Frontend
│   ├── src/
│   │   ├── pages/
│   │   │   ├── LoginPage.tsx
│   │   │   ├── HRDashboard.tsx
│   │   │   └── DepartmentPage.tsx
│   │   ├── components/
│   │   │   ├── ProtectedRoute.tsx
│   │   │   ├── DepartmentEditModal.tsx
│   │   │   ├── EmployeesTable.tsx
│   │   │   └── DeleteEmployeeDialog.tsx
│   │   ├── hooks/
│   │   │   └── useAuth.ts
│   │   ├── graphql/
│   │   │   ├── client.ts
│   │   │   ├── queries.ts
│   │   │   └── mutations.ts
│   │   ├── constants/
│   │   │   └── api.ts
│   │   ├── styles/
│   │   │   └── globals.css
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── README.md
│
└── README.md                 # This file
```

## 🎨 Technology Stack

### Backend
- **NestJS** - Progressive Node.js framework
- **GraphQL** - Query language for APIs
- **Apollo Server** - GraphQL server
- **TypeScript** - Type-safe JavaScript

### Frontend
- **React 18+** - UI library
- **TypeScript** - Type-safe JavaScript
- **Material-UI (MUI)** - Component library
- **Tailwind CSS** - Utility-first CSS
- **React Hook Form** - Form management
- **Apollo Client** - GraphQL client
- **React Router v6** - Routing
- **Vite** - Build tool

## ✨ Features Breakdown

### Department Management
- View department details (English & Arabic)
- Edit department information
- Real-time status updates
- Export department data

### Employee Management
- View employees in department
- Delete employees with confirmation
- Professional table with sorting
- Responsive design

### Authentication & Security
- Login system with validation
- Protected routes
- Session management
- Logout functionality

### Performance
- React.memo optimization
- Lazy loading routes
- Optimized GraphQL queries
- Efficient re-rendering

## 🧪 Testing

### Backend GraphQL Testing
Use the GraphQL Playground at http://localhost:3000/graphql

### Frontend Testing
Navigate to http://localhost:5173 and test:
1. Login with HR/HR
2. View department details
3. Edit department
4. Delete employee
5. Logout

## 🔧 Configuration

### Backend Environment Variables
No environment variables required. Server runs on port 3000 by default.

### Frontend Environment Variables
Create `.env.local` in frontend directory:
```env
VITE_GRAPHQL_ENDPOINT=http://localhost:3000/graphql
```

## 📝 Notes

- Backend uses static JSON data (no database required)
- All changes persist to `backend/src/data/department.json`
- Frontend validates authentication via localStorage
- CORS is configured for localhost:5173

## 🐛 Troubleshooting

### Backend won't start
- Check if port 3000 is available
- Ensure all dependencies are installed
- Verify Node.js version (18+)

### Frontend won't connect to backend
- Ensure backend is running on port 3000
- Check CORS configuration
- Verify .env.local file exists

### Login doesn't work
- Use exact credentials: HR/HR (case-sensitive)
- Clear browser localStorage and try again

## 🚀 Production Build

### Backend
```bash
cd backend
npm run build
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm run preview
```

## 📄 License

This project is for educational and demonstration purposes.

## 👥 Support

For issues and questions, please refer to the README files in each directory:
- Backend: `backend/README.md`
- Frontend: `frontend/README.md`" 
