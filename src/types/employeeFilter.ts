export enum EmployeeFilter {
  ALL = "ALL",
  ACTIVE = "ACTIVE",
  ON_LEAVE = "ON_LEAVE",
}

export type DepartmentFilter = `DEPARTMENT_${string}`;

export type FilterType = EmployeeFilter | DepartmentFilter;
