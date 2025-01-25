import { gql } from "@apollo/client";

export const TEAM_OVERVIEW = gql`
  query TeamOverview {
    teamOverview {
      totalEmployees
      activeEmployees
      employeesOnLeave
      departmentBreakdown {
        department
        count
      }
    }
  }
`;

export const GET_EMPLOYEES = gql`
  query GetEmployees($filter: String!) {
    employees(filter: $filter) {
      id
      name
      department
      leaveType
      leaveStart
      leaveEnd
    }
  }
`;

export const GET_BIRTHDAYS = gql`
  query BirthdaysThisWeek {
    birthdaysThisWeek {
      id
      name
      department
      dob
    }
  }
`;

export const GET_EMPLOYEES_ON_LEAVE = gql`
  query EmployeesOnLeave($page: Int, $limit: Int, $department: String) {
    employeesOnLeave(page: $page, limit: $limit, department: $department) {
      employees {
        id
        name
        department
        leaveType
        leaveStart
        leaveEnd
      }
      totalCount
    }
  }
`; 

export const GET_DEPARTMENT_LIST = gql`
query GetDepartmentList {
  getDepartmentList {
    id
    name
  }
}
`;