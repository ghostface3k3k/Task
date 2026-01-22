import { gql } from '@apollo/client';

export const GET_ALL_DEPARTMENTS = gql`
  query GetAllDepartments {
    getAllDepartments {
      id
      name
      description
      localization
      code
      manager
      location
      employeesNumber
      status
      parentDepartment
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

export const GET_DEPARTMENT = gql`
  query GetDepartment($id: ID!) {
    getDepartment(id: $id) {
      id
      name
      description
      localization
      code
      manager
      location
      employeesNumber
      status
      parentDepartment
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
  query GetEmployees($departmentId: ID!) {
    getEmployees(departmentId: $departmentId) {
      id
      name
      role
      contact
    }
  }
`;

export const UPDATE_DEPARTMENT = gql`
  mutation UpdateDepartment($id: ID!, $input: UpdateDepartmentInput!) {
    updateDepartment(id: $id, input: $input) {
      id
      name
      description
      localization
      code
      manager
      location
      employeesNumber
      status
      parentDepartment
      createdAt
    }
  }
`;

export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($employeeId: ID!) {
    deleteEmployee(employeeId: $employeeId)
  }
`;

export const ADD_EMPLOYEE = gql`
  mutation AddEmployee($departmentId: ID!, $input: AddEmployeeInput!) {
    addEmployee(departmentId: $departmentId, input: $input) {
      id
      name
      role
      contact
    }
  }
`;
