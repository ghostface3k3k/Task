# HR Management System - Frontend

A modern, responsive React + TypeScript frontend for the HR Management System with GraphQL integration.

## 🚀 Features

- **Authentication**: Secure login with protected routes
- **Departments Management**: View and edit department information
- **Employees Management**: Add, view, and delete employee records
- **GraphQL Integration**: Apollo Client for efficient data management
- **Material-UI Components**: Professional and responsive UI
- **Form Validation**: React Hook Form for robust form handling
- **Type Safety**: Full TypeScript support throughout
- **Performance Optimized**: Lazy loading, memoization, and code splitting

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend GraphQL server running on `http://localhost:3000/graphql`

## 🛠️ Technology Stack

- **React 18**: Modern React with hooks
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server
- **Material-UI (MUI)**: Professional React components
- **Tailwind CSS**: Utility-first CSS framework
- **Apollo Client**: GraphQL client for data fetching
- **React Router v6**: Client-side routing
- **React Hook Form**: Form validation and handling

## 📦 Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update `.env` with your GraphQL endpoint (default is already set):
```
VITE_GRAPHQL_ENDPOINT=http://localhost:3000/graphql
```

## 🏃 Running the Application

### Development Mode
```bash
npm run dev
```
The application will open automatically at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Lint Code
```bash
npm run lint
```

## 🔐 Login Credentials

**Default credentials for testing:**
- Username: `HR`
- Password: `HR`

> Note: These are hardcoded credentials for demonstration purposes. In production, implement proper authentication.

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── AddEmployeeModal.tsx
│   │   ├── DepartmentEditModal.tsx
│   │   ├── DepartmentView.tsx
│   │   ├── EmployeesList.tsx
│   │   └── ProtectedRoute.tsx
│   ├── pages/               # Page components
│   │   ├── LoginPage.tsx
│   │   ├── HRManageDashboard.tsx
│   │   ├── DepartmentsPage.tsx
│   │   └── EmployeesPage.tsx
│   ├── hooks/               # Custom React hooks
│   │   └── useAuth.ts
│   ├── graphql/             # GraphQL operations
│   │   ├── client.ts
│   │   ├── queries.ts
│   │   └── mutations.ts
│   ├── constants/           # Application constants
│   │   ├── api.ts
│   │   └── credentials.ts
│   ├── styles/              # Global styles
│   │   └── globals.css
│   ├── App.tsx              # Main app component with routing
│   └── main.tsx             # Application entry point
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── postcss.config.js        # PostCSS configuration
```

## 🗺️ Application Routes

- `/login` - Login page (public)
- `/hr-manage` - Dashboard (protected)
- `/hr-manage/departments` - Departments management (protected)
- `/hr-manage/employees` - Employees management (protected)

## 🎨 Components Overview

### Pages

**LoginPage**: 
- Simple login form with validation
- Hardcoded credentials check
- Redirects to dashboard on success

**HRManageDashboard**: 
- Main landing page after login
- Navigation cards to Departments and Employees sections
- Logout functionality

**DepartmentsPage**: 
- Displays all departments
- View department details
- Edit department information
- Real-time updates via GraphQL

**EmployeesPage**: 
- List of all employees in table format
- Add new employee via modal
- Delete employee with confirmation
- Department assignment

### Components

**DepartmentView**: 
- Comprehensive department information display
- Shows manager, location, parent department
- Lists all employees in the department
- Status indicators and metadata

**DepartmentEditModal**: 
- Form to edit department details
- Pre-populated with existing data
- Validation for all fields
- Real-time updates

**EmployeesList**: 
- Responsive table of employees
- Status chips
- Department information
- Delete actions

**AddEmployeeModal**: 
- Form to add new employees
- All required fields with validation
- Department selection dropdown
- Email validation

**ProtectedRoute**: 
- Route guard component
- Checks authentication status
- Redirects to login if not authenticated

### Hooks

**useAuth**: 
- Manages authentication state
- Login/logout functionality
- Token persistence in localStorage
- Authentication status checking

## 🔄 GraphQL Operations

### Queries
- `GET_DEPARTMENT` - Fetch single department by ID
- `GET_ALL_DEPARTMENTS` - Fetch all departments
- `GET_EMPLOYEES` - Fetch all employees
- `GET_EMPLOYEE` - Fetch single employee by ID

### Mutations
- `UPDATE_DEPARTMENT` - Update department information
- `DELETE_DEPARTMENT` - Delete a department
- `ADD_EMPLOYEE` - Create new employee
- `UPDATE_EMPLOYEE` - Update employee information
- `DELETE_EMPLOYEE` - Delete an employee

## 🎯 Key Features

### Authentication
- Token-based authentication
- Protected routes
- Auto-redirect on unauthorized access
- Persistent login state

### Performance Optimizations
- **Lazy Loading**: Routes are code-split and loaded on demand
- **Memoization**: Components use React.memo to prevent unnecessary re-renders
- **Callbacks**: Event handlers wrapped in useCallback
- **Cache Management**: Apollo Client cache-and-network fetch policy

### User Experience
- Loading states for all async operations
- Error handling with user-friendly messages
- Success notifications via Snackbar
- Confirmation dialogs for destructive actions
- Responsive design for all screen sizes

### Form Handling
- React Hook Form for efficient form management
- Real-time validation
- Error messages
- Pre-populated forms for editing
- Type-safe form data

## 🐛 Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Change port in vite.config.ts or kill the process using port 5173
lsof -ti:5173 | xargs kill -9
```

**GraphQL connection errors:**
- Ensure backend server is running on `http://localhost:3000/graphql`
- Check `.env` file has correct `VITE_GRAPHQL_ENDPOINT`
- Verify CORS is enabled on backend

**Build errors:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 🔒 Security Notes

- Current implementation uses hardcoded credentials (HR/HR) for demonstration
- In production, implement proper authentication with backend
- Use environment variables for sensitive configuration
- Implement proper CORS policies
- Add request/response interceptors for security headers

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

The build artifacts will be in the `dist/` directory, ready to deploy to:
- Vercel
- Netlify
- AWS S3 + CloudFront
- Any static hosting service

### Environment Variables for Production
Make sure to set `VITE_GRAPHQL_ENDPOINT` to your production GraphQL API URL.

## 📝 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🤝 Contributing

1. Follow the existing code structure
2. Use TypeScript types for all new code
3. Add comments for complex logic
4. Test thoroughly before committing
5. Follow Material-UI design guidelines

## 📄 License

This project is part of the HR Management System.

## 📞 Support

For issues or questions, please contact the development team.

---

**Built with ❤️ using React, TypeScript, and Material-UI**
