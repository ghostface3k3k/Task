"# HR Management System

A complete, production-ready HR Management System built with modern web technologies, featuring a React frontend and NestJS backend with GraphQL API.

## 🚀 Features

### Frontend
- **Authentication System** - Secure login with JWT tokens
- **Dashboard** - Tab-based navigation with overview statistics
- **Employee Management** - Complete CRUD operations with search and filter
- **Department Management** - Department directory with employee listings
- **Profile Pages** - Detailed employee and department views
- **Responsive Design** - Mobile-friendly using Tailwind CSS
- **GraphQL Integration** - Efficient data fetching with Apollo Client

### Backend
- **GraphQL API** - Type-safe API with auto-generated schema
- **JWT Authentication** - Secure user authentication and authorization
- **Database Integration** - PostgreSQL with TypeORM
- **Entity Management** - Users, Employees, and Departments
- **Error Handling** - Comprehensive error handling and validation
- **CORS Support** - Configured for frontend-backend communication

## 📋 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v13 or higher)
- npm or yarn

## 🛠️ Installation

### 1. Clone the Repository
```bash
git clone https://github.com/ghostface3k3k/Task.git
cd Task
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```env
NODE_ENV=development
PORT=4000

# Database
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=hr_management

# JWT
JWT_SECRET=your-secret-key-change-this-in-production
JWT_EXPIRATION=1d

# CORS
CORS_ORIGIN=http://localhost:5173
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

### 4. Database Setup

Create the PostgreSQL database:
```bash
psql -U postgres
CREATE DATABASE hr_management;
\q
```

## 🚀 Running the Application

### Start Backend (Terminal 1)
```bash
cd backend
npm run start:dev
```
Backend will run on `http://localhost:4000/graphql`

### Start Frontend (Terminal 2)
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:5173`

## 📊 Database Schema

### User Entity
- `id` (UUID, Primary Key)
- `email` (String, Unique)
- `password` (String, Hashed)
- `role` (String)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

### Employee Entity
- `id` (UUID, Primary Key)
- `firstName` (String)
- `lastName` (String)
- `email` (String, Unique)
- `phone` (String)
- `dateOfBirth` (Date)
- `position` (String)
- `department` (Foreign Key to Department)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

### Department Entity
- `id` (UUID, Primary Key)
- `name` (String)
- `code` (String, Unique)
- `manager` (String, Optional)
- `location` (String, Optional)
- `employees` (One-to-Many with Employee)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

## 🔑 GraphQL API

### Authentication Mutations
```graphql
# Login
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    access_token
    user {
      id
      email
      role
    }
  }
}

# Register
mutation Register($email: String!, $password: String!, $role: String) {
  register(email: $email, password: $password, role: $role) {
    access_token
    user {
      id
      email
      role
    }
  }
}
```

### Employee Queries & Mutations
```graphql
# Get all employees
query GetEmployees {
  employees {
    id
    firstName
    lastName
    email
    phone
    position
    department {
      id
      name
    }
  }
}

# Get single employee
query GetEmployee($id: String!) {
  employee(id: $id) {
    id
    firstName
    lastName
    email
    phone
    dateOfBirth
    position
    department {
      id
      name
      code
    }
  }
}

# Create employee
mutation CreateEmployee($createEmployeeInput: CreateEmployeeInput!) {
  createEmployee(createEmployeeInput: $createEmployeeInput) {
    id
    firstName
    lastName
  }
}
```

### Department Queries & Mutations
```graphql
# Get all departments
query GetDepartments {
  departments {
    id
    name
    code
    manager
    location
    employees {
      id
      firstName
      lastName
    }
  }
}

# Get single department
query GetDepartment($id: String!) {
  department(id: $id) {
    id
    name
    code
    manager
    location
    employees {
      id
      firstName
      lastName
      email
      position
    }
  }
}
```

## 🧪 Testing the Application

### Create a Test User
1. Start the backend server
2. Open GraphQL Playground at `http://localhost:4000/graphql`
3. Run the following mutation:

```graphql
mutation {
  register(
    email: "admin@example.com"
    password: "password123"
    role: "admin"
  ) {
    access_token
    user {
      id
      email
    }
  }
}
```

### Create Test Data

Create a department:
```graphql
mutation {
  createDepartment(createDepartmentInput: {
    name: "Engineering"
    code: "ENG"
    manager: "John Smith"
    location: "San Francisco"
  }) {
    id
    name
  }
}
```

Create an employee (use the department ID from above):
```graphql
mutation {
  createEmployee(createEmployeeInput: {
    firstName: "Jane"
    lastName: "Doe"
    email: "jane.doe@example.com"
    phone: "+1234567890"
    dateOfBirth: "1990-01-15"
    position: "Software Engineer"
    departmentId: "YOUR_DEPARTMENT_ID_HERE"
  }) {
    id
    firstName
    lastName
  }
}
```

## 🏗️ Project Structure

```
project/
├── frontend/
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   ├── pages/             # Page components
│   │   │   ├── LoginPage.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── EmployeeListPage.tsx
│   │   │   ├── EmployeeProfilePage.tsx
│   │   │   ├── DepartmentListPage.tsx
│   │   │   └── DepartmentDetailsPage.tsx
│   │   ├── graphql/           # GraphQL queries/mutations
│   │   │   ├── client.ts
│   │   │   ├── mutations/
│   │   │   └── queries/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.ts
├── backend/
│   ├── src/
│   │   ├── auth/              # Authentication module
│   │   ├── employees/         # Employee module
│   │   ├── departments/       # Department module
│   │   ├── users/             # User module
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Route guards for protected pages
- Input validation and sanitization
- CORS configuration
- SQL injection prevention via TypeORM

## 🎨 Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Apollo Client** - GraphQL client
- **React Router v6** - Routing

### Backend
- **NestJS** - Node.js framework
- **GraphQL** - API layer
- **TypeORM** - ORM
- **PostgreSQL** - Database
- **JWT** - Authentication
- **bcrypt** - Password hashing

## 📝 Default Credentials

After creating a user with the register mutation, use these credentials:
- **Email**: admin@example.com
- **Password**: password123

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Support

For support, email support@example.com or create an issue in the GitHub repository.

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder
3. Set environment variable: `VITE_API_URL=your-backend-url`

### Backend Deployment (Heroku/Railway)
1. Set all environment variables
2. Deploy with: `npm run build && npm run start:prod`
3. Ensure PostgreSQL database is provisioned

## 📊 Future Enhancements

- [ ] Role-based access control (RBAC)
- [ ] Employee performance reviews
- [ ] Leave management system
- [ ] Payroll integration
- [ ] Real-time notifications
- [ ] File upload for employee documents
- [ ] Advanced reporting and analytics
- [ ] Email notifications
- [ ] Multi-language support
- [ ] Dark mode toggle" 
