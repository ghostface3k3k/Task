import { gql } from '@apollo/client';

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

export const GET_DEPARTMENTS = gql`
  query GetDepartments {
    departments {
      id
      name
      description
      code
      manager
      location
      employeesNumber
      status
      createdAt
    }
  }
`;

export const GET_EMPLOYEES = gql`
  query GetEmployees($departmentId: ID!) {
    employees(departmentId: $departmentId) {
      id
      name
      role
      contact
    }
  }
`;
