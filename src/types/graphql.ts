import { Employee } from "./employee";
import { TeamStats } from "./team";

export interface EmployeesOnLeaveResponse {
  employeesOnLeave: {
    employees: Employee[];
    totalCount: number;
  }
}

export interface BirthdaysResponse {
  birthdaysThisWeek: Employee[];
}

export interface TeamOverviewResponse {
  teamOverview: TeamStats;
}

export interface EmployeesResponse {
  employees: Employee[];
} 