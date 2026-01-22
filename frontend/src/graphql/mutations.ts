import { gql } from '@apollo/client';

// Update department
export const UPDATE_DEPARTMENT = gql`
  mutation UpdateDepartment($id: ID!, $input: UpdateDepartmentInput!) {
    updateDepartment(id: $id, input: $input) {
      id
      name
      description
      localization
      code
      managerId
      locationId
      status
      parentDepartmentId
      updatedAt
    }
  }
`;

// Delete department
export const DELETE_DEPARTMENT = gql`
  mutation DeleteDepartment($id: ID!) {
    deleteDepartment(id: $id) {
      success
      message
    }
  }
`;

// Add employee
export const ADD_EMPLOYEE = gql`
  mutation AddEmployee($input: CreateEmployeeInput!) {
    createEmployee(input: $input) {
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
    }
  }
`;

// Update employee
export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee($id: ID!, $input: UpdateEmployeeInput!) {
    updateEmployee(id: $id, input: $input) {
      id
      firstName
      lastName
      email
      position
      departmentId
      salary
      hireDate
      status
      updatedAt
    }
  }
`;

// Delete employee
export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id) {
      success
      message
    }
  }
`;
