import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
        name
      }
    }
  }
`;

export const GET_DEPARTMENTS = gql`
  query GetDepartments {
    getDepartments {
      id
      name
      description
      code
      manager
      location
      employeesNumber
      status
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
      localization {
        name
        description
      }
      code
      manager
      location
      employeesNumber
      status
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
    getEmployees {
      id
      name
      role
      contact
    }
  }
`;

export const GET_EMPLOYEE = gql`
  query GetEmployee($id: Int!) {
    getEmployee(id: $id) {
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
      manager
      location
      status
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee($departmentId: ID!, $employeeId: Int!, $input: UpdateEmployeeInput!) {
    updateEmployee(departmentId: $departmentId, employeeId: $employeeId, input: $input) {
      id
      name
      role
      contact
    }
  }
`;

export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($departmentId: ID!, $employeeId: Int!) {
    deleteEmployee(departmentId: $departmentId, employeeId: $employeeId)
  }
`;
