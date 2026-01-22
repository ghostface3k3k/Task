# Quick Setup Guide

## Getting Started in 3 Steps

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Configure Environment
```bash
# Copy the example environment file
cp .env.example .env

# The default configuration should work if your backend is running on localhost:3000
# VITE_GRAPHQL_ENDPOINT=http://localhost:3000/graphql
```

### 3. Start Development Server
```bash
npm run dev
```

The application will open at `http://localhost:5173`

## Login Information

- **Username**: `HR`
- **Password**: `HR`

## What's Included

✅ Complete React + TypeScript setup with Vite  
✅ Material-UI (MUI) components for professional UI  
✅ Tailwind CSS for utility styling  
✅ Apollo Client for GraphQL integration  
✅ React Router v6 for navigation  
✅ React Hook Form for form validation  
✅ Protected routes with authentication  
✅ Lazy loading for performance  
✅ Responsive design  

## Application Features

### Pages
- **Login Page** (`/login`) - Authentication
- **Dashboard** (`/hr-manage`) - Main navigation hub
- **Departments** (`/hr-manage/departments`) - View and edit departments
- **Employees** (`/hr-manage/employees`) - Manage employee records

### Key Components
- `DepartmentView` - Display department details
- `DepartmentEditModal` - Edit department information
- `EmployeesList` - Table of employees
- `AddEmployeeModal` - Add new employees
- `ProtectedRoute` - Route authentication guard

### Custom Hooks
- `useAuth` - Authentication state management

### GraphQL Operations
- Queries: GET_DEPARTMENT, GET_ALL_DEPARTMENTS, GET_EMPLOYEES
- Mutations: UPDATE_DEPARTMENT, DELETE_EMPLOYEE, ADD_EMPLOYEE

## Project Structure

```
frontend/
├── src/
│   ├── components/       # Reusable components
│   ├── pages/           # Route pages
│   ├── hooks/           # Custom hooks
│   ├── graphql/         # GraphQL setup
│   ├── constants/       # Configuration
│   ├── styles/          # Global styles
│   ├── App.tsx          # Main app with routing
│   └── main.tsx         # Entry point
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## Common Commands

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
```

## Troubleshooting

**Backend Connection Issues:**
- Ensure backend is running on `http://localhost:3000/graphql`
- Check CORS is enabled on backend
- Verify `.env` has correct endpoint

**Port Conflicts:**
- Default port is 5173
- Change in `vite.config.ts` if needed

## Next Steps

1. Start the backend GraphQL server
2. Run `npm install` in the frontend directory
3. Run `npm run dev`
4. Navigate to `http://localhost:5173`
5. Login with HR/HR
6. Explore the application!

## Support

For detailed documentation, see [README.md](README.md)
