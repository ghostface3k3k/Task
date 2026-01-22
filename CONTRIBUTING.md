# Contributing to HR Management System

Thank you for your interest in contributing to the HR Management System! This document provides guidelines and instructions for contributing to the project.

## 📋 Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)
- [Documentation](#documentation)

---

## Code of Conduct

### Our Pledge
We are committed to providing a welcoming and inclusive environment for everyone.

### Expected Behavior
- Be respectful and considerate
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Accept responsibility for mistakes

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- PostgreSQL (v13+)
- Git
- Code editor (VS Code recommended)

### First Time Setup

1. **Fork the Repository**
   ```bash
   # Click "Fork" on GitHub
   git clone https://github.com/YOUR_USERNAME/Task.git
   cd Task
   ```

2. **Add Upstream Remote**
   ```bash
   git remote add upstream https://github.com/ghostface3k3k/Task.git
   ```

3. **Install Dependencies**
   ```bash
   # Backend
   cd backend
   npm install
   
   # Frontend
   cd ../frontend
   npm install
   ```

4. **Setup Database**
   ```bash
   createdb hr_management_dev
   ```

5. **Configure Environment**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your settings
   ```

---

## Development Setup

### Backend Development

1. **Start Development Server**
   ```bash
   cd backend
   npm run start:dev
   ```

2. **Access GraphQL Playground**
   - Open http://localhost:4000/graphql
   - Test queries and mutations

### Frontend Development

1. **Start Development Server**
   ```bash
   cd frontend
   npm run dev
   ```

2. **Access Application**
   - Open http://localhost:5173
   - Login with test credentials

### Database Management

**Generate Migration**
```bash
cd backend
npm run typeorm migration:generate -- -n YourMigrationName
```

**Run Migrations**
```bash
npm run typeorm migration:run
```

---

## Project Structure

### Backend Structure
```
backend/src/
├── auth/           # Authentication logic
├── users/          # User management
├── employees/      # Employee CRUD
├── departments/    # Department CRUD
├── common/         # Shared utilities
├── database/       # Database config
├── app.module.ts   # Root module
└── main.ts         # Entry point
```

### Frontend Structure
```
frontend/src/
├── components/     # Reusable components
├── pages/          # Page components
├── layouts/        # Layout components
├── graphql/        # GraphQL operations
├── styles/         # Global styles
├── App.tsx         # Root component
└── main.tsx        # Entry point
```

---

## Coding Standards

### TypeScript

**Use Strong Typing**
```typescript
// ✅ Good
interface Employee {
  id: string;
  firstName: string;
  lastName: string;
}

function getEmployee(id: string): Promise<Employee> {
  // ...
}

// ❌ Bad
function getEmployee(id: any): any {
  // ...
}
```

**Use Interfaces Over Types**
```typescript
// ✅ Good
interface User {
  id: string;
  email: string;
}

// ❌ Avoid
type User = {
  id: string;
  email: string;
}
```

### Backend Code Style

**NestJS Modules**
```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Entity])],
  providers: [Service, Resolver],
  exports: [Service],
})
export class FeatureModule {}
```

**GraphQL Resolvers**
```typescript
@Resolver(() => Employee)
export class EmployeesResolver {
  constructor(private readonly employeesService: EmployeesService) {}

  @Query(() => [Employee])
  @UseGuards(JwtAuthGuard)
  employees() {
    return this.employeesService.findAll();
  }
}
```

**Services**
```typescript
@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeesRepository: Repository<Employee>,
  ) {}

  async findAll(): Promise<Employee[]> {
    return this.employeesRepository.find({ relations: ['department'] });
  }
}
```

### Frontend Code Style

**React Components**
```typescript
import React from 'react';

interface Props {
  title: string;
  onClose: () => void;
}

const Component: React.FC<Props> = ({ title, onClose }) => {
  return (
    <div className="container">
      <h1>{title}</h1>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default Component;
```

**GraphQL Hooks**
```typescript
import { useQuery } from '@apollo/client';
import { GET_EMPLOYEES } from '../graphql/queries/employees';

const EmployeeList: React.FC = () => {
  const { loading, error, data } = useQuery(GET_EMPLOYEES);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data.employees.map(emp => (
        <div key={emp.id}>{emp.firstName}</div>
      ))}
    </div>
  );
};
```

### Naming Conventions

**Files**
- Components: `PascalCase.tsx` (e.g., `EmployeeList.tsx`)
- Services: `kebab-case.service.ts` (e.g., `employees.service.ts`)
- Modules: `kebab-case.module.ts` (e.g., `employees.module.ts`)
- Utilities: `kebab-case.ts` (e.g., `format-date.ts`)

**Variables & Functions**
```typescript
// camelCase for variables and functions
const employeeCount = 10;
function getEmployeeName() {}

// PascalCase for classes and interfaces
class EmployeeService {}
interface EmployeeData {}

// UPPER_CASE for constants
const MAX_EMPLOYEES = 100;
```

---

## Commit Guidelines

### Commit Message Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

### Examples
```bash
feat(employees): add employee search functionality

Add search bar to employee list page that filters by name and email

Closes #123

---

fix(auth): resolve JWT token expiration issue

Token expiration was not being checked correctly

Fixes #456

---

docs(api): update GraphQL schema documentation

Add examples for all mutations and queries
```

---

## Pull Request Process

### Before Submitting

1. **Update Your Fork**
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Changes**
   - Write clean, documented code
   - Follow coding standards
   - Add tests if applicable

4. **Test Your Changes**
   ```bash
   # Backend
   cd backend
   npm run build
   npm run lint
   
   # Frontend
   cd frontend
   npm run build
   npm run lint
   ```

5. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat(scope): your message"
   ```

6. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

### Creating the Pull Request

1. Go to your fork on GitHub
2. Click "Pull Request"
3. Select your feature branch
4. Fill out the PR template:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested locally
- [ ] Added/updated tests
- [ ] All tests passing

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed code
- [ ] Commented complex code
- [ ] Updated documentation
- [ ] No new warnings
```

### PR Review Process

1. Automated checks will run
2. Maintainers will review your code
3. Address any feedback
4. Once approved, PR will be merged

---

## Testing

### Backend Tests

**Unit Tests**
```typescript
describe('EmployeesService', () => {
  it('should return all employees', async () => {
    const employees = await service.findAll();
    expect(employees).toBeDefined();
    expect(Array.isArray(employees)).toBe(true);
  });
});
```

**Run Tests**
```bash
cd backend
npm test
```

### Frontend Tests

**Component Tests**
```typescript
import { render, screen } from '@testing-library/react';
import LoginPage from './LoginPage';

test('renders login form', () => {
  render(<LoginPage />);
  const emailInput = screen.getByLabelText(/email/i);
  expect(emailInput).toBeInTheDocument();
});
```

**Run Tests**
```bash
cd frontend
npm test
```

---

## Documentation

### Code Comments

**When to Comment**
- Complex algorithms
- Non-obvious business logic
- Workarounds for known issues
- Public API methods

**Example**
```typescript
/**
 * Calculates employee tenure in years
 * @param hireDate - Employee's hire date
 * @returns Tenure in years (rounded down)
 */
function calculateTenure(hireDate: Date): number {
  const years = (Date.now() - hireDate.getTime()) / 31536000000;
  return Math.floor(years);
}
```

### Updating Documentation

When adding features:
1. Update README.md if user-facing
2. Update API.md for API changes
3. Add code comments for complex logic
4. Update QUICKSTART.md if setup changes

---

## Development Tips

### Useful Commands

**Backend**
```bash
npm run start:dev    # Development server
npm run build        # Build for production
npm run lint         # Lint code
npm run format       # Format code
```

**Frontend**
```bash
npm run dev          # Development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Lint code
```

### VS Code Extensions

Recommended:
- ESLint
- Prettier
- GraphQL
- TypeScript
- Tailwind CSS IntelliSense
- Auto Import

### Debugging

**Backend**
```bash
npm run start:debug
```
Then attach debugger on port 9229

**Frontend**
Use browser DevTools and React DevTools

---

## Feature Requests

Have an idea? Great!

1. Check existing issues
2. Create new issue with:
   - Clear description
   - Use cases
   - Expected behavior
   - Mockups if applicable

---

## Bug Reports

Found a bug?

1. Check if already reported
2. Create issue with:
   - Clear title
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if helpful
   - Environment details

---

## Questions?

- Check documentation first
- Search existing issues
- Ask in discussions
- Contact maintainers

---

## Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Appreciated in the community!

---

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing! 🎉
