# HR Management System - Frontend

Modern HR Management System frontend built with React, TypeScript, Material-UI, and Tailwind CSS.

## Technology Stack

- **React 18+** - Modern React with hooks
- **TypeScript** - Type-safe JavaScript
- **Material-UI (MUI)** - Component library
- **Tailwind CSS** - Utility-first CSS framework
- **React Hook Form** - Form validation and management
- **Apollo Client** - GraphQL client
- **React Router v6** - Client-side routing
- **Vite** - Fast build tool

## Installation

```bash
npm install
```

## Environment Setup

Create a `.env.local` file in the frontend directory:

```env
VITE_GRAPHQL_ENDPOINT=http://localhost:3000/graphql
```

You can copy from the example:
```bash
cp .env.example .env.local
```

## Running the Application

### Development Mode
```bash
npm run dev
```

The application will start on http://localhost:5173

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Login Credentials

- **Username:** HR
- **Password:** HR

## Features

### Authentication
- Login page with form validation
- Protected routes
- Session management with localStorage
- Logout functionality

### Department Management
- View department details (English and Arabic)
- Edit department information
- Export department data as JSON
- Real-time updates

### Employee Management
- View assigned employees table
- Delete employees with confirmation
- Professional table layout with alternating row colors
- Responsive design

### Performance Optimizations
- React.memo for table components
- useCallback for event handlers
- useMemo for computed values
- Lazy loading for routes
- Optimized GraphQL queries

## Project Structure

```
frontend/
├── src/
│   ├── pages/
│   │   ├── LoginPage.tsx           # Login page
│   │   ├── HRDashboard.tsx         # Main dashboard
│   │   └── DepartmentPage.tsx      # Department details page
│   ├── components/
│   │   ├── ProtectedRoute.tsx      # Route protection
│   │   ├── DepartmentEditModal.tsx # Edit department modal
│   │   ├── EmployeesTable.tsx      # Employees table component
│   │   └── DeleteEmployeeDialog.tsx # Delete confirmation dialog
│   ├── hooks/
│   │   └── useAuth.ts              # Authentication hook
│   ├── graphql/
│   │   ├── client.ts               # Apollo Client setup
│   │   ├── queries.ts              # GraphQL queries
│   │   └── mutations.ts            # GraphQL mutations
│   ├── constants/
│   │   └── api.ts                  # API constants
│   ├── styles/
│   │   └── globals.css             # Global styles
│   ├── App.tsx                     # Main app component
│   └── main.tsx                    # Entry point
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── README.md
```

## Available Routes

- `/` - Redirects to dashboard if authenticated, else to login
- `/login` - Login page (public)
- `/dashboard` - HR Dashboard (protected)
- `*` - 404 fallback (redirects to home)

## GraphQL Integration

The frontend uses Apollo Client to connect to the backend GraphQL API.

### Queries Used
- `GET_DEPARTMENT` - Fetch department details
- `GET_DEPARTMENTS` - Fetch all departments
- `GET_EMPLOYEES` - Fetch department employees

### Mutations Used
- `UPDATE_DEPARTMENT` - Update department information
- `DELETE_EMPLOYEE` - Delete an employee
- `ADD_EMPLOYEE` - Add new employee

## Styling

The application combines Material-UI components with Tailwind CSS utility classes for styling:

- Material-UI for complex components (Tables, Dialogs, Forms)
- Tailwind CSS for layout and custom styling
- Poppins font family for typography
- Responsive design with breakpoints
- Professional color scheme (Blue primary, Red secondary)

## Form Validation

All forms use React Hook Form with validation:
- Required field validation
- Error message display
- Clear errors on input change
- Disabled submit during loading

## Error Handling

- GraphQL error handling with user-friendly messages
- Network error handling
- Loading states for async operations
- Success notifications for completed actions

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2020+ support required

## Development Notes

- The application uses Vite for fast development and building
- Hot Module Replacement (HMR) enabled in development
- TypeScript strict mode enabled
- ESLint configured for code quality

## Troubleshooting

### Backend Connection Issues
Make sure the backend is running on http://localhost:3000 and the GraphQL endpoint is accessible.

### CORS Errors
Ensure the backend has CORS enabled for http://localhost:5173

### Login Issues
Use the credentials: HR/HR (case-sensitive)

## Future Enhancements

- Add more departments
- User profile management
- Advanced filtering and sorting
- Data export in multiple formats
- Real-time notifications
- Dark mode support
