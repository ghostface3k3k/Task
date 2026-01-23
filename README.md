# HR Management System

A modern full-stack HR Management System built with React, TypeScript, NestJS, and GraphQL.

## Overview

This project is a complete monorepo containing a frontend and backend application for managing HR operations including employee management, department management, and organizational structure.

## Project Structure

```
/
├── frontend/          # React + TypeScript + MUI + Tailwind CSS
├── backend/           # NestJS + GraphQL
└── README.md          # This file
```

## Technology Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Library**: Material-UI (MUI) v7
- **Styling**: Tailwind CSS v4
- **State Management**: Apollo Client
- **Forms**: React Hook Form
- **Routing**: React Router v6

### Backend
- **Framework**: NestJS
- **API**: GraphQL with Apollo Server
- **Language**: TypeScript
- **Data**: Static JSON (department.json)

## Features

### Implemented Features
- ✅ User authentication (dummy login: admin@hr.com / password123)
- ✅ Dashboard with quick navigation
- ✅ Department management (list, view, edit)
- ✅ Employee listing with department information
- ✅ Department details with assigned employees
- ✅ Employee CRUD operations (view, delete)
- ✅ CSV export functionality for employee lists
- ✅ Responsive design for mobile and desktop
- ✅ GraphQL API with queries and mutations
- ✅ Authentication context and protected routes

### Design Features
- Pixel-perfect implementation based on Figma designs
- Custom color palette matching brand guidelines
- Poppins and Roboto font families
- Material Design components with custom styling
- Responsive layouts with breakpoints
- Loading states and error handling
- Breadcrumb navigation

## Quick Start

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/ghostface3k3k/Task.git
cd Task
```

2. **Install backend dependencies**
```bash
cd backend
npm install
```

3. **Install frontend dependencies**
```bash
cd ../frontend
npm install
```

### Running the Application

#### Start the Backend
```bash
cd backend
npm run start:dev
```
Backend will be available at `http://localhost:4000/graphql`

#### Start the Frontend
```bash
cd frontend
npm run dev
```
Frontend will be available at `http://localhost:5173`

### Building for Production

#### Build Backend
```bash
cd backend
npm run build
npm run start:prod
```

#### Build Frontend
```bash
cd frontend
npm run build
npm run preview
```

## Default Credentials

- **Email**: admin@hr.com
- **Password**: password123

## API Documentation

### GraphQL Endpoint
`http://localhost:4000/graphql`

### Main Queries
- `getDepartments` - Get all departments with employees
- `getDepartment(id)` - Get specific department
- `getEmployees` - Get all employees across departments

### Main Mutations
- `login(email, password)` - User authentication
- `updateDepartment(id, input)` - Update department information
- `deleteEmployee(departmentId, employeeId)` - Remove employee
- `updateEmployee(departmentId, employeeId, input)` - Update employee details

## Project Features

### Pages
1. **Login** - Authentication page with dummy credentials
2. **Dashboard** - Main navigation hub
3. **Departments List** - Card view of all departments
4. **Department Details** - Detailed view with employee table
5. **Edit Department** - Form for editing department information
6. **Employees List** - Table view of all employees
7. **Employee Profile** - Placeholder for detailed employee view

### Data Structure
The system uses a static JSON file (`backend/src/data/department.json`) with 5 departments and their associated employees. Each department includes:
- Basic information (name, description, code, manager, location)
- Localization support (Arabic translations)
- Employee list with KPI metrics
- Status and creation date

## Development

### Backend Development
- GraphQL Playground available at `/graphql`
- Hot reload enabled with `npm run start:dev`
- TypeScript with strict mode
- Modular structure with resolvers and services

### Frontend Development
- Hot module replacement with Vite
- TypeScript with type checking
- Component-based architecture
- Apollo Client for GraphQL integration
- React Hook Form for form management

## Testing

### Backend
```bash
cd backend
npm test
```

### Frontend
```bash
cd frontend
npm test
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

ISC License

## Acknowledgments

- Design based on provided Figma specifications
- Built as part of HR management system requirements
- Uses Material-UI for consistent component design
- GraphQL for efficient data fetching

## Support

For support, email ghostface3k3k@github.com or create an issue in the repository.

## Roadmap

### Future Enhancements
- [ ] Complete employee profile with all Figma sections
- [ ] Advanced search and filtering
- [ ] Pagination for large datasets
- [ ] Role-based access control
- [ ] File upload for documents
- [ ] Analytics and reporting
- [ ] Real-time notifications
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Unit and integration tests
- [ ] CI/CD pipeline
- [ ] Docker containerization

## Architecture

### Monorepo Structure
The project uses a monorepo structure with npm workspaces for better code organization and dependency management.

### Frontend Architecture
- **Component Structure**: Organized by feature (pages, components, lib)
- **State Management**: Apollo Client cache + React Context for auth
- **Routing**: Protected routes with authentication guard
- **Styling**: Combination of MUI components and Tailwind utilities

### Backend Architecture
- **Modular Design**: Separate modules for auth and departments
- **GraphQL First**: Schema-first approach with code generation
- **Service Layer**: Business logic separated from resolvers
- **Data Layer**: Static JSON for demo purposes

## Environment Variables

### Backend (.env)
```
PORT=4000
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:4000/graphql
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Mobile Support

The application is fully responsive and works on:
- iOS devices (iPhone, iPad)
- Android devices (phones, tablets)
- Desktop browsers

## Performance

- Lazy loading for routes
- Code splitting with Vite
- Optimized bundle size
- Apollo Client caching
- Memoized components

## Security

- JWT-based authentication (placeholder)
- CORS configuration
- Input validation
- XSS protection through React
- CSRF protection ready

---

**Built with ❤️ using React, NestJS, and GraphQL**
