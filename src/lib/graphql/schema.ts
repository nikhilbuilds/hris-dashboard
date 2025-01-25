import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Employee {
    id: ID!
    name: String!
    department: String!
    leaveType: String
    leaveStart: String
    leaveEnd: String
    dob: String
  }

  type TeamStats {
    totalEmployees: Int!
    activeEmployees: Int!
    employeesOnLeave: Int!
    departmentBreakdown: [DepartmentStats!]!
  }

  type DepartmentStats {
    department: String!
    count: Int!
  }

  type Query {
    employeesOnLeave(
      page: Int
      limit: Int
      department: String
    ): EmployeesOnLeaveResult

    birthdaysThisWeek: [Employee!]!

    teamOverview: TeamStats!

    getDepartmentList: [Departments!]!
  }

  type EmployeesOnLeaveResult {
    employees: [Employee!]!
    totalCount: Int!
  }

  type Departments {
    id: ID!
    name: String!
  }
`;
