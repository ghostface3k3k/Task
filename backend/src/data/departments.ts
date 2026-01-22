export interface Employee {
  id: string;
  name: string;
  role: string;
  contact: string;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  localization: string;
  code: string;
  manager: string;
  location: string;
  employeesNumber: number;
  status: string;
  parentDepartment: string | null;
  createdAt: string;
  employees: Employee[];
}

export const staticDepartments: Department[] = [
  {
    id: '1',
    name: 'Engineering',
    description: 'Software development and engineering',
    localization: 'الهندسة',
    code: 'ENG001',
    manager: 'John Smith',
    location: 'Building A, Floor 3',
    employeesNumber: 5,
    status: 'Active',
    parentDepartment: null,
    createdAt: '2023-01-15T10:00:00Z',
    employees: [
      { id: '1', name: 'Alice Johnson', role: 'Senior Developer', contact: 'alice@company.com' },
      { id: '2', name: 'Bob Williams', role: 'Frontend Developer', contact: 'bob@company.com' },
      { id: '3', name: 'Charlie Brown', role: 'Backend Developer', contact: 'charlie@company.com' },
      { id: '4', name: 'Diana Prince', role: 'DevOps Engineer', contact: 'diana@company.com' },
      { id: '5', name: 'Eve Adams', role: 'QA Engineer', contact: 'eve@company.com' }
    ]
  },
  {
    id: '2',
    name: 'Human Resources',
    description: 'HR and employee management',
    localization: 'الموارد البشرية',
    code: 'HR001',
    manager: 'Sarah Davis',
    location: 'Building B, Floor 1',
    employeesNumber: 3,
    status: 'Active',
    parentDepartment: null,
    createdAt: '2023-01-10T10:00:00Z',
    employees: [
      { id: '6', name: 'Frank Miller', role: 'HR Manager', contact: 'frank@company.com' },
      { id: '7', name: 'Grace Lee', role: 'Recruiter', contact: 'grace@company.com' },
      { id: '8', name: 'Henry Wilson', role: 'HR Coordinator', contact: 'henry@company.com' }
    ]
  },
  {
    id: '3',
    name: 'Marketing',
    description: 'Marketing and brand management',
    localization: 'التسويق',
    code: 'MKT001',
    manager: 'Michael Chen',
    location: 'Building A, Floor 2',
    employeesNumber: 4,
    status: 'Active',
    parentDepartment: null,
    createdAt: '2023-02-01T10:00:00Z',
    employees: [
      { id: '9', name: 'Iris Taylor', role: 'Marketing Director', contact: 'iris@company.com' },
      { id: '10', name: 'Jack Anderson', role: 'Content Writer', contact: 'jack@company.com' },
      { id: '11', name: 'Karen Moore', role: 'Social Media Manager', contact: 'karen@company.com' },
      { id: '12', name: 'Leo Martinez', role: 'SEO Specialist', contact: 'leo@company.com' }
    ]
  },
  {
    id: '4',
    name: 'Finance',
    description: 'Financial planning and accounting',
    localization: 'المالية',
    code: 'FIN001',
    manager: 'Nancy Garcia',
    location: 'Building B, Floor 2',
    employeesNumber: 3,
    status: 'Active',
    parentDepartment: null,
    createdAt: '2023-01-20T10:00:00Z',
    employees: [
      { id: '13', name: 'Mia Rodriguez', role: 'CFO', contact: 'mia@company.com' },
      { id: '14', name: 'Nathan White', role: 'Accountant', contact: 'nathan@company.com' },
      { id: '15', name: 'Olivia Harris', role: 'Financial Analyst', contact: 'olivia@company.com' }
    ]
  },
  {
    id: '5',
    name: 'Sales',
    description: 'Sales and business development',
    localization: 'المبيعات',
    code: 'SAL001',
    manager: 'Peter Thompson',
    location: 'Building A, Floor 1',
    employeesNumber: 4,
    status: 'Active',
    parentDepartment: null,
    createdAt: '2023-02-10T10:00:00Z',
    employees: [
      { id: '16', name: 'Quinn Jackson', role: 'Sales Director', contact: 'quinn@company.com' },
      { id: '17', name: 'Rachel Clark', role: 'Sales Representative', contact: 'rachel@company.com' },
      { id: '18', name: 'Sam Lewis', role: 'Business Developer', contact: 'sam@company.com' },
      { id: '19', name: 'Tina Walker', role: 'Account Manager', contact: 'tina@company.com' }
    ]
  }
];

let departments = [...staticDepartments];

export const getDepartments = (): Department[] => departments;

export const getDepartmentById = (id: string): Department | undefined => {
  return departments.find(dept => dept.id === id);
};

export const updateDepartment = (id: string, updates: Partial<Department>): Department | null => {
  const index = departments.findIndex(dept => dept.id === id);
  if (index === -1) return null;
  
  departments[index] = { ...departments[index], ...updates };
  return departments[index];
};

export const deleteEmployee = (employeeId: string): boolean => {
  for (const dept of departments) {
    const empIndex = dept.employees.findIndex(emp => emp.id === employeeId);
    if (empIndex !== -1) {
      dept.employees.splice(empIndex, 1);
      dept.employeesNumber = dept.employees.length;
      return true;
    }
  }
  return false;
};

export const addEmployee = (departmentId: string, employee: Omit<Employee, 'id'>): Employee | null => {
  const dept = departments.find(d => d.id === departmentId);
  if (!dept) return null;
  
  const newEmployee: Employee = {
    id: String(Date.now()),
    ...employee
  };
  
  dept.employees.push(newEmployee);
  dept.employeesNumber = dept.employees.length;
  return newEmployee;
};

export const getEmployeesByDepartment = (departmentId: string): Employee[] => {
  const dept = departments.find(d => d.id === departmentId);
  return dept ? dept.employees : [];
};
