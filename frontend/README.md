# HR Management System - Frontend

## Description

Modern React frontend with TypeScript for the HR Management System. Features department management, employee tracking, and a beautiful UI built with Material-UI and Tailwind CSS.

## Technologies

- React 18+
- TypeScript
- Vite
- Material-UI (MUI)
- Tailwind CSS
- Apollo Client (GraphQL)
- React Hook Form
- React Router v6
- React Toastify

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env.local` file in the frontend directory:

```env
VITE_GRAPHQL_ENDPOINT=http://localhost:3000/graphql
```

See `.env.example` for reference.

## Running the Application

### Development Mode
```bash
npm run dev
```

The application will run on `http://localhost:5173`

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
- Simple login with credentials stored in localStorage
- Protected routes requiring authentication
- Logout functionality

### Department Management
- View department details
- Edit department information (name, description, manager, location, status)
- Support for both English and Arabic localization
- Export department data as JSON
- Real-time status badges (Active/Inactive)

### Employee Management
- View employees in a professional table
- Delete employees with confirmation dialog
- Alternating row colors for better readability
- Responsive table design

### UI/UX Features
- Pixel-perfect design using Figma specifications
- Professional color scheme
- Poppins font family
- Responsive design (mobile, tablet, desktop)
- Loading states for async operations
- Toast notifications for user actions
- Breadcrumb navigation
- Clean and intuitive interface

## Project Structure

```
frontend/
├── src/
│   ├── pages/
│   │   ├── LoginPage.tsx          # Login page with form validation
│   │   ├── HRDashboard.tsx        # Main dashboard
│   │   └── DepartmentPage.tsx     # Department details page
│   ├── components/
│   │   ├── DepartmentEditModal.tsx    # Edit department modal
│   │   ├── EmployeesTable.tsx         # Employees table with delete
│   │   ├── DeleteEmployeeDialog.tsx   # Delete confirmation dialog
│   │   └── ProtectedRoute.tsx         # Route protection HOC
│   ├── hooks/
│   │   └── useAuth.ts             # Authentication hook
│   ├── graphql/
│   │   ├── client.ts              # Apollo Client setup
│   │   ├── queries.ts             # GraphQL queries
│   │   └── mutations.ts           # GraphQL mutations
│   ├── constants/
│   │   └── api.ts                 # API constants and config
│   ├── styles/
│   │   └── globals.css            # Global styles
│   ├── App.tsx                    # Main app component
│   └── main.tsx                   # Entry point
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Performance Optimizations

- **React.memo** - Used for table rows to prevent unnecessary re-renders
- **useCallback** - Applied to event handlers
- **useMemo** - Used for computed values (formatted dates, etc.)
- **Lazy Loading** - Routes are lazy loaded with React.lazy
- **Network-only fetch policy** - Ensures fresh data from GraphQL

## GraphQL Integration

The frontend connects to the backend GraphQL API at `http://localhost:3000/graphql`.

### Queries Used
- `GetDepartment` - Fetch department details with employees
- `GetDepartments` - Fetch all departments
- `GetEmployees` - Fetch employees by department

### Mutations Used
- `UpdateDepartment` - Update department information
- `DeleteEmployee` - Remove employee from department
- `AddEmployee` - Add new employee to department

## Code Quality

- Clean, well-organized TypeScript code
- Proper type definitions throughout
- Component separation of concerns
- Error handling for API calls
- Constants for configuration values
- Comprehensive comments

## Styling

- Tailwind CSS utility classes
- Material-UI components with custom styling
- Responsive grid layouts
- Professional color scheme (Blue primary)
- Consistent typography (Poppins font)
- Custom scrollbar styling

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- All API calls use Apollo Client with GraphQL
- Authentication is handled via localStorage (no JWT)
- Form validation uses React Hook Form
- Notifications use react-toastify
- The app is fully responsive and mobile-friendly
