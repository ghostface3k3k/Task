import { gql } from '@apollo/client';

export const GET_DEPARTMENTS = gql`
  query GetDepartments {
    departments {
      id
      name
      code
      manager
      location
      created_at
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

export const GET_DEPARTMENT = gql`
  query GetDepartment($id: String!) {
    department(id: $id) {
      id
      name
      code
      manager
      location
      created_at
      updated_at
      employees {
        id
        firstName
        lastName
        email
        phone
        position
        dateOfBirth
      }
    }
  }
`;

export const CREATE_DEPARTMENT = gql`
  mutation CreateDepartment($createDepartmentInput: CreateDepartmentInput!) {
    createDepartment(createDepartmentInput: $createDepartmentInput) {
      id
      name
      code
    }
  }
`;

export const UPDATE_DEPARTMENT = gql`
  mutation UpdateDepartment($id: String!, $updateDepartmentInput: UpdateDepartmentInput!) {
    updateDepartment(id: $id, updateDepartmentInput: $updateDepartmentInput) {
      id
      name
      code
    }
  }
`;

export const DELETE_DEPARTMENT = gql`
  mutation DeleteDepartment($id: String!) {
    deleteDepartment(id: $id)
  }
`;
