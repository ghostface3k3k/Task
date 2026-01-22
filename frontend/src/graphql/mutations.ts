import { gql } from '@apollo/client';

export const LOGIN = gql`
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

export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($departmentId: ID!, $employeeId: ID!) {
    deleteEmployee(departmentId: $departmentId, employeeId: $employeeId) {
      success
      message
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee($id: ID!, $input: UpdateEmployeeInput!) {
    updateEmployee(id: $id, input: $input) {
      id
      name
      role
      contact
    }
  }
`;

export const DELETE_EMPLOYEE_RECORD = gql`
  mutation DeleteEmployeeRecord($id: ID!) {
    deleteEmployeeRecord(id: $id) {
      success
      message
    }
  }
`;
