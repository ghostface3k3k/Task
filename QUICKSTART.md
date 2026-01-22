# Quick Start Guide

## Prerequisites
- Node.js 18 or higher
- npm or yarn

## Setup Instructions

### 1. Backend Setup (Terminal 1)

```bash
cd backend
npm install --legacy-peer-deps
npm run start:dev
```

**Expected Output:**
```
🚀 Server ready at http://localhost:4000/graphql
```

### 2. Frontend Setup (Terminal 2)

```bash
cd frontend
npm install
npm run dev
```

**Expected Output:**
```
VITE ready in XXX ms
➜  Local:   http://localhost:3000/
```

### 3. Access the Application

1. Open your browser and navigate to: `http://localhost:3000`
2. Login with credentials:
   - **Username**: `HR`
   - **Password**: `HR`
3. Explore the dashboard!

## What You Can Do

### Departments Tab
- **View** all departments with details
- **Edit** department information (click edit icon)
- **Delete** departments (click delete icon)

### Employees Tab
1. **Select** a department from dropdown
2. **View** all employees in that department
3. **Add** new employees (click "+ ADD EMPLOYEE" button)
4. **Delete** employees (click delete icon)

## Testing the GraphQL API

Visit `http://localhost:4000/graphql` to access the GraphQL Playground.

### Sample Queries

**Get All Departments:**
```graphql
query {
  getAllDepartments {
    id
    name
    code
    manager
    employees {
      id
      name
      role
    }
  }
}
```

**Get Department by ID:**
```graphql
query {
  getDepartment(id: "1") {
    name
    description
    employees {
      name
      role
    }
  }
}
```

### Sample Mutations

**Update Department:**
```graphql
mutation {
  updateDepartment(id: "1", input: {
    name: "Engineering Department"
    manager: "Jane Doe"
  }) {
    id
    name
    manager
  }
}
```

**Add Employee:**
```graphql
mutation {
  addEmployee(departmentId: "1", input: {
    name: "John Developer"
    role: "Full Stack Developer"
    contact: "john@company.com"
  }) {
    id
    name
    role
  }
}
```

**Delete Employee:**
```graphql
mutation {
  deleteEmployee(employeeId: "1")
}
```

## Troubleshooting

### Backend won't start
- Make sure you're using Node.js 18+
- Try removing `node_modules` and `package-lock.json`, then run `npm install --legacy-peer-deps` again

### Frontend won't start
- Make sure the backend is running first
- Check if port 3000 is available
- Try removing `node_modules` and `package-lock.json`, then run `npm install` again

### Can't login
- Make sure you're using exactly: `HR` / `HR` (case-sensitive)
- Clear browser localStorage and try again

### GraphQL errors
- Verify the backend is running on port 4000
- Check the browser console for detailed error messages
- Ensure CORS is properly configured

## Default Data

The system comes with 5 departments:
1. **Engineering** - 5 employees
2. **Human Resources** - 3 employees  
3. **Marketing** - 4 employees
4. **Finance** - 3 employees
5. **Sales** - 4 employees

Total: 19 employees across all departments

## Stopping the Application

Press `Ctrl+C` in both terminal windows to stop the servers.
