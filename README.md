"# HR Management System

A full-stack HR Management System built with React, TypeScript, Material-UI, Tailwind CSS, NestJS, and GraphQL.

## 🚀 Features

### Frontend
- ✅ Modern React 18+ with TypeScript
- ✅ Material-UI (MUI) components
- ✅ Tailwind CSS for styling
- ✅ Apollo Client for GraphQL
- ✅ React Hook Form for form validation
- ✅ React Router v6 for routing
- ✅ Protected routes with authentication
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Toast notifications
- ✅ Performance optimizations (React.memo, useCallback, useMemo)
- ✅ Lazy loading routes

### Backend
- ✅ NestJS framework
- ✅ GraphQL API with Apollo Server
- ✅ TypeScript
- ✅ Static JSON data storage
- ✅ CORS enabled
- ✅ GraphQL Playground

### Features
- ✅ User authentication (simple localStorage-based)
- ✅ Department management (view, edit)
- ✅ Employee management (view, delete)
- ✅ Bilingual support (English & Arabic)
- ✅ Export department data
- ✅ Professional UI/UX

## 📁 Project Structure

```
Task/
├── backend/                    # NestJS GraphQL Backend
│   ├── src/
│   │   ├── data/              # Static JSON data
│   │   │   └── department.json
│   │   ├── resolvers/         # GraphQL resolvers
│   │   │   ├── department.resolver.ts
│   │   │   └── employee.resolver.ts
│   │   ├── services/          # Business logic
│   │   │   └── department.service.ts
│   │   ├── schema.graphql     # GraphQL schema
│   │   ├── app.module.ts      # Main module
│   │   └── main.ts            # Entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
├── frontend/                   # React Frontend
│   ├── src/
│   │   ├── pages/             # Page components
│   │   │   ├── LoginPage.tsx
│   │   │   ├── HRDashboard.tsx
│   │   │   └── DepartmentPage.tsx
│   │   ├── components/        # Reusable components
│   │   │   ├── DepartmentEditModal.tsx
│   │   │   ├── EmployeesTable.tsx
│   │   │   ├── DeleteEmployeeDialog.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   ├── hooks/             # Custom hooks
│   │   │   └── useAuth.ts
│   │   ├── graphql/           # GraphQL setup
│   │   │   ├── client.ts
│   │   │   ├── queries.ts
│   │   │   └── mutations.ts
│   │   ├── constants/         # Constants
│   │   │   └── api.ts
│   │   ├── styles/            # Global styles
│   │   │   └── globals.css
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── README.md
│
└── README.md                   # This file
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 16+ and npm
- Git

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the backend server:
```bash
npm run start:dev
```

The GraphQL server will run on `http://localhost:3000/graphql`

### Frontend Setup

1. Navigate to frontend directory (in a new terminal):
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 🔐 Login Credentials

- **Username:** `HR`
- **Password:** `HR`

## 📊 GraphQL API

### Endpoints

- **GraphQL Playground:** `http://localhost:3000/graphql`
- **GraphQL API:** `http://localhost:3000/graphql`

### Example Queries

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
    description
    status
  }
}
```

#### Delete Employee
```graphql
mutation DeleteEmployee($departmentId: ID!, $employeeId: ID!) {
  deleteEmployee(departmentId: $departmentId, employeeId: $employeeId)
}
```

## 🎨 Tech Stack

### Frontend
- **Framework:** React 18+
- **Language:** TypeScript
- **Build Tool:** Vite
- **UI Library:** Material-UI (MUI)
- **Styling:** Tailwind CSS
- **GraphQL Client:** Apollo Client
- **Forms:** React Hook Form
- **Routing:** React Router v6
- **Notifications:** React Toastify

### Backend
- **Framework:** NestJS
- **Language:** TypeScript
- **API:** GraphQL (Apollo Server)
- **Data Storage:** Static JSON file

## 📝 Features Overview

### Authentication
- Simple login system with localStorage
- Protected routes
- Session persistence

### Department Management
- View department details
- Edit department information
- Display both English and Arabic content
- Export department data as JSON
- Status badges (Active/Inactive)

### Employee Management
- View employees in a table
- Delete employees with confirmation
- Professional table design with alternating row colors

### UI/UX
- Responsive design for all screen sizes
- Professional color scheme
- Poppins font family
- Loading states
- Toast notifications for all actions
- Breadcrumb navigation
- Clean and intuitive interface

## 🚀 Performance Optimizations

- React.memo for preventing unnecessary re-renders
- useCallback for stable function references
- useMemo for expensive computations
- Lazy loading of routes
- Optimized GraphQL queries

## 📄 License

This project is for demonstration purposes.

## 👥 Authors

HR Management System Team

## 🤝 Contributing

This is a demonstration project. For production use, consider adding:
- Real database integration
- JWT authentication
- User management
- Role-based access control
- Unit and integration tests
- CI/CD pipeline
- Docker containerization

## 📞 Support

For issues or questions, please refer to the individual README files in the backend and frontend directories." 
