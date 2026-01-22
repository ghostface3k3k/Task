"# HR Management System - Full Stack Application

A complete production-ready HR Management System built with React + TypeScript frontend and NestJS + GraphQL backend.

## 🚀 Features

### Frontend
- ✅ Authentication (HR/HR credentials)
- ✅ HR Management Dashboard
- ✅ Department Management (View, Edit, Delete)
- ✅ Employee Management (Add, View, Delete)
- ✅ Protected Routes
- ✅ Responsive Design with Material-UI
- ✅ GraphQL Integration with Apollo Client
- ✅ Form Validation with React Hook Form
- ✅ Professional UI with Tailwind CSS

### Backend
- ✅ GraphQL API (3 Queries, 3 Mutations)
- ✅ NestJS Framework
- ✅ In-Memory Data Management
- ✅ CORS Configuration
- ✅ Type-Safe TypeScript
- ✅ Comprehensive Error Handling
- ✅ GraphQL Playground

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Task
```

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
npm run start:dev
```

The backend will be available at `http://localhost:3000/graphql`

### 3. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 🎯 Usage

### Login Credentials

- **Username**: `HR`
- **Password**: `HR`

### Navigation

1. Login at `http://localhost:5173/login`
2. Navigate to HR Management Dashboard
3. Access:
   - **Departments** - View and manage department information
   - **Employees** - View, add, and delete employees

## 📁 Project Structure

```
Task/
├── backend/                 # NestJS + GraphQL Backend
│   ├── src/
│   │   ├── config/          # Configuration (CORS)
│   │   ├── data/            # Static data (department.json)
│   │   ├── resolvers/       # GraphQL resolvers
│   │   ├── services/        # Business logic
│   │   ├── types/           # TypeScript types
│   │   ├── app.module.ts    # Main module
│   │   ├── main.ts          # Entry point
│   │   └── schema.graphql   # GraphQL schema
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
├── frontend/                # React + TypeScript Frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── constants/       # Constants (API, credentials)
│   │   ├── graphql/         # Apollo Client & queries
│   │   ├── hooks/           # Custom hooks (useAuth)
│   │   ├── pages/           # Page components
│   │   ├── styles/          # Global styles
│   │   ├── App.tsx          # Main app with routing
│   │   └── main.tsx         # Entry point
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── README.md
│
└── README.md                # This file
```

## 🔌 API Endpoints

### GraphQL Queries

```graphql
# Get a specific department
query GetDepartment($id: ID!) {
  getDepartment(id: $id) {
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

# Get all departments
query GetAllDepartments {
  getAllDepartments {
    id
    name
    manager
    status
  }
}

# Get employees for a department
query GetEmployees($departmentId: ID!) {
  getEmployees(departmentId: $departmentId) {
    id
    name
    role
    contact
  }
}
```

### GraphQL Mutations

```graphql
# Update department
mutation UpdateDepartment($id: ID!, $input: UpdateDepartmentInput!) {
  updateDepartment(id: $id, input: $input) {
    id
    name
    description
  }
}

# Delete employee
mutation DeleteEmployee($departmentId: ID!, $employeeId: ID!) {
  deleteEmployee(departmentId: $departmentId, employeeId: $employeeId)
}

# Add employee
mutation AddEmployee($departmentId: ID!, $input: AddEmployeeInput!) {
  addEmployee(departmentId: $departmentId, input: $input) {
    id
    name
    role
    contact
  }
}
```

## 🛠️ Development

### Backend Commands

```bash
npm run start         # Start production server
npm run start:dev     # Start development server with watch mode
npm run build         # Build for production
npm run format        # Format code with Prettier
```

### Frontend Commands

```bash
npm run dev           # Start development server
npm run build         # Build for production
npm run preview       # Preview production build
npm run lint          # Lint code with ESLint
```

## 🧪 Testing

### Backend Testing

```bash
cd backend
npm run start:dev
# Visit http://localhost:3000/graphql to test queries and mutations
```

### Frontend Testing

```bash
cd frontend
npm run dev
# Visit http://localhost:5173 and test the UI
```

## 🎨 Technology Stack

### Frontend
- **React 18.2** - UI library
- **TypeScript 5.3** - Type safety
- **Vite 5.0** - Build tool
- **Material-UI 5.15** - Component library
- **Tailwind CSS 3.4** - Utility-first CSS
- **Apollo Client 3.8** - GraphQL client
- **React Router 6.21** - Routing
- **React Hook Form 7.49** - Form handling

### Backend
- **NestJS 10.3** - Node.js framework
- **GraphQL 16.8** - API query language
- **Apollo Server 4.9** - GraphQL server
- **TypeScript 5.3** - Type safety

## 📝 Environment Variables

### Backend (.env)
```env
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_GRAPHQL_ENDPOINT=http://localhost:3000/graphql
```

## 🔐 Security

- CORS configured for frontend-backend communication
- Authentication with localStorage tokens
- Protected routes on frontend
- Input validation on forms
- Error handling throughout the application

## 📄 License

MIT License

## 👥 Author

HR Management System Team

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support, email support@hrmanagement.com or open an issue in the repository.

---

**Built with ❤️ using React, TypeScript, NestJS, and GraphQL**" 
