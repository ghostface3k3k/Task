import { gql } from '@apollo/client';

export const GET_EMPLOYEES = gql`
  query GetEmployees {
    employees {
      id
      firstName
      lastName
      email
      phone
      dateOfBirth
      position
      created_at
      department {
        id
        name
        code
      }
    }
  }
`;

export const GET_EMPLOYEE = gql`
  query GetEmployee($id: String!) {
    employee(id: $id) {
      id
      firstName
      lastName
      email
      phone
      dateOfBirth
      position
      created_at
      updated_at
      department {
        id
        name
        code
        manager
        location
      }
    }
  }
`;

export const CREATE_EMPLOYEE = gql`
  mutation CreateEmployee($createEmployeeInput: CreateEmployeeInput!) {
    createEmployee(createEmployeeInput: $createEmployeeInput) {
      id
      firstName
      lastName
      email
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee($id: String!, $updateEmployeeInput: UpdateEmployeeInput!) {
    updateEmployee(id: $id, updateEmployeeInput: $updateEmployeeInput) {
      id
      firstName
      lastName
      email
    }
  }
`;

export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: String!) {
    deleteEmployee(id: $id)
  }
`;
