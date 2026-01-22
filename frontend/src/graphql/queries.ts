import { gql } from '@apollo/client';

export const GET_DEPARTMENTS = gql`
  query GetDepartments {
    departments {
      id
      name
      code
      manager
      location
      employeesNumber
      status
      createdAt
    }
  }
`;

export const GET_DEPARTMENT = gql`
  query GetDepartment($id: ID!) {
    department(id: $id) {
      id
      name
      description
      localization {
        name
        description
      }
      code
      manager
      location
      employeesNumber
      status
      parentDepartment {
        id
        name
      }
      createdAt
      employees {
        id
        name
        role
        contact
      }
    }
  }
`;

export const GET_EMPLOYEES = gql`
  query GetEmployees {
    employees {
      id
      name
      role
      contact
      departmentId
    }
  }
`;

export const GET_EMPLOYEE = gql`
  query GetEmployee($id: ID!) {
    employee(id: $id) {
      id
      name
      role
      contact
      departmentId
      department {
        id
        name
      }
    }
  }
`;
