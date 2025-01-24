export interface TeamStats {
  totalEmployees: number;
  activeEmployees: number;
  employeesOnLeave: number;
  departmentBreakdown: { department: string; count: number }[];
}
