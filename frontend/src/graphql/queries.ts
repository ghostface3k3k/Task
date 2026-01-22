import { gql } from '@apollo/client';

// Get single department by ID
export const GET_DEPARTMENT = gql`
  query GetDepartment($id: ID!) {
    department(id: $id) {
      id
      name
      description
      localization
      code
      managerId
      locationId
      status
      parentDepartmentId
      createdAt
      updatedAt
      manager {
        id
        firstName
        lastName
        email
      }
      location {
        id
        name
        address
      }
      parentDepartment {
        id
        name
      }
      employees {
        id
        firstName
        lastName
        email
        position
      }
    }
  }
`;

// Get all departments
export const GET_ALL_DEPARTMENTS = gql`
  query GetAllDepartments {
    departments {
      id
      name
      description
      localization
      code
      managerId
      locationId
      status
      parentDepartmentId
      createdAt
      updatedAt
      manager {
        id
        firstName
        lastName
        email
      }
      location {
        id
        name
        address
      }
      parentDepartment {
        id
        name
      }
      employees {
        id
        firstName
        lastName
        email
        position
      }
    }
  }
`;

// Get all employees
export const GET_EMPLOYEES = gql`
  query GetEmployees {
    employees {
      id
      firstName
      lastName
      email
      position
      departmentId
      salary
      hireDate
      status
      createdAt
      updatedAt
      department {
        id
        name
      }
    }
  }
`;

// Get single employee by ID
export const GET_EMPLOYEE = gql`
  query GetEmployee($id: ID!) {
    employee(id: $id) {
      id
      firstName
      lastName
      email
      position
      departmentId
      salary
      hireDate
      status
      createdAt
      updatedAt
      department {
        id
        name
      }
    }
  }
`;
