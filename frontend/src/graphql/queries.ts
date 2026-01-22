import { gql } from '@apollo/client';

export const GET_DEPARTMENT = gql`
  query GetDepartment($id: String!) {
    getDepartment(id: $id) {
      id
      code
      nameEn
      nameAr
      manager
      location
      status
      createdAt
      profile {
        nationalId
        title
        firstName
        lastName
        dateOfBirth
        gender
        nationality
        passportNumber
        passportIssueDate
        passportExpiryDate
        maritalStatus
        personalEmail
        mobile
        emergencyContacts {
          name
          relationship
          phone
        }
        address {
          street
          city
          state
          zipCode
          country
        }
        drivingLicense {
          number
          issueDate
          expiryDate
          type
        }
        militaryStatus {
          status
          serviceYears
          rank
        }
      }
      employees {
        id
        name
        role
        contactInfo
        kpi
      }
    }
  }
`;

export const GET_DEPARTMENT_EMPLOYEES = gql`
  query GetDepartmentEmployees($id: String!) {
    getDepartmentEmployees(id: $id) {
      id
      name
      role
      contactInfo
      kpi
    }
  }
`;

export const UPDATE_DEPARTMENT = gql`
  mutation UpdateDepartment($id: String!, $input: UpdateDepartmentInput!) {
    updateDepartment(id: $id, input: $input) {
      id
      code
      nameEn
      nameAr
      manager
      location
      status
      createdAt
    }
  }
`;

export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($departmentId: String!, $employeeId: String!) {
    deleteEmployee(departmentId: $departmentId, employeeId: $employeeId)
  }
`;
