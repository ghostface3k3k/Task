import { gql } from '@apollo/client';

export const UPDATE_DEPARTMENT = gql`
  mutation UpdateDepartment($id: ID!, $input: UpdateDepartmentInput!) {
    updateDepartment(id: $id, input: $input) {
      id
      name
      description
      localization {
        name
        description
      }
      manager
      location
      status
      employeesNumber
      code
      createdAt
    }
  }
`;

export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($departmentId: ID!, $employeeId: ID!) {
    deleteEmployee(departmentId: $departmentId, employeeId: $employeeId)
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
