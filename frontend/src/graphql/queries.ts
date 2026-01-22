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
    }
  }
`;

export const GET_DEPARTMENT_EMPLOYEES = gql`
  query GetDepartmentEmployees($id: ID!) {
    departmentEmployees(id: $id) {
      id
      name
      role
      contact
      kpi
    }
  }
`;

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
      code
      manager
      location
      employeesNumber
      status
    }
  }
`;

export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($departmentId: ID!, $employeeId: ID!) {
    deleteEmployee(departmentId: $departmentId, employeeId: $employeeId)
  }
`;

export const GET_EMPLOYEE = gql`
  query GetEmployee($id: ID!) {
    employee(id: $id) {
      id
      nationalId
      title
      firstName
      middleName
      lastName
      dateOfBirth
      gender
      nationality
      passportNumber
      maritalStatus
      email
      mobile
      emergencyContacts {
        name
        relationship
        phone
      }
      address {
        street
        city
        country
        postalCode
      }
      drivingLicense {
        number
        expiryDate
      }
      militaryStatus
      departmentId
      role
      avatar
    }
  }
`;
