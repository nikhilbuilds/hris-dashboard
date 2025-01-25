import { employees, departments, leaveRecords } from "../data/mock-data";
import { EmployeeFilter, FilterType } from "@/types/employeeFilter";

const getEmployeesWithDepartment = (
  employeeList: any[],
  departmentMap: Map<string, string>
) => {
  return employeeList.map((employee) => ({
    ...employee,
    department: departmentMap.get(employee.departmentId),
  }));
};

const getEmployeesOnLeaveForDate = (date: Date) => {
  const departmentMap = new Map(departments.map((d) => [d.id, d.name]));
  const employeeMap = new Map(employees.map((e) => [e.id, e]));
  const employeesOnLeaveMap = new Map();

  leaveRecords.forEach((record) => {
    const leaveStart = new Date(record.leaveStart);
    const leaveEnd = new Date(record.leaveEnd);
    leaveStart.setHours(0, 0, 0, 0);
    leaveEnd.setHours(0, 0, 0, 0);

    if (date >= leaveStart && date <= leaveEnd) {
      const employee = employeeMap.get(record.employeeId);
      if (!employee) return;

      employeesOnLeaveMap.set(employee.id, {
        ...employee,
        department: departmentMap.get(employee.departmentId),
        leaveType: record.leaveType,
        leaveStart: record.leaveStart,
        leaveEnd: record.leaveEnd,
      });
    }
  });

  return Array.from(employeesOnLeaveMap.values());
};

export const resolvers = {
  Query: {
    employeesOnLeave: (
      _: any,
      args: { page?: number; limit?: number; department?: string }
    ) => {
      const { page, limit, department } = args;
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      let filteredEmployees = getEmployeesOnLeaveForDate(today);

      if (department) {
        filteredEmployees = filteredEmployees.filter(
          (employee) => employee.department === department
        );
      }

      // Handle pagination
      if (page && limit) {
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        return {
          employees: filteredEmployees.slice(startIndex, endIndex),
          totalCount: filteredEmployees.length,
        };
      }

      return {
        employees: filteredEmployees,
        totalCount: filteredEmployees.length,
      };
    },

    birthdaysThisWeek: () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const nextWeek = new Date(today);
      nextWeek.setDate(today.getDate() + 7);
      nextWeek.setHours(23, 59, 59, 999);

      const currentYear = today.getFullYear();

      const departmentMap = new Map(departments.map((d) => [d.id, d.name]));

      return employees
        .filter((employee) => {
          const dob = new Date(employee.dob);
          const birthdayThisYear = new Date(
            currentYear,
            dob.getMonth(),
            dob.getDate()
          );

          if (birthdayThisYear < today) {
            birthdayThisYear.setFullYear(currentYear + 1);
          }

          return birthdayThisYear >= today && birthdayThisYear <= nextWeek;
        })
        .map((employee) => ({
          id: employee.id,
          name: employee.name,
          department: departmentMap.get(employee.departmentId),
          dob: employee.dob,
        }));
    },

    teamOverview: () => {
      const totalEmployees = employees.length;
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      let employeesOnLeave = getEmployeesOnLeaveForDate(today).length;
      const activeEmployees = totalEmployees - employeesOnLeave;

      const departmentBreakdown = departments.map((department) => ({
        department: department.name,
        count: employees.filter((e) => e.departmentId === department.id).length,
      }));

      return {
        totalEmployees,
        activeEmployees,
        employeesOnLeave,
        departmentBreakdown,
      };
    },
    getDepartmentList: () => {
      return departments;
    },
    employees: (_: any, { filter }: { filter: FilterType }) => {
      const departmentMap = new Map(departments.map((d) => [d.id, d.name]));
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      switch (filter) {
        case EmployeeFilter.ALL:
          return getEmployeesWithDepartment(employees, departmentMap);

        case EmployeeFilter.ACTIVE: {
          const onLeaveEmployees = getEmployeesOnLeaveForDate(today);
          const onLeaveIds = new Set(onLeaveEmployees.map((e) => e.id));
          const activeEmployees = employees.filter(
            (e) => !onLeaveIds.has(e.id)
          );
          return getEmployeesWithDepartment(activeEmployees, departmentMap);
        }

        case EmployeeFilter.ON_LEAVE:
          return getEmployeesOnLeaveForDate(today);

        default:
          if (filter.startsWith("DEPARTMENT_")) {
            const departmentName = filter.replace("DEPARTMENT_", "");
            const department = departments.find(
              (d) => d.name === departmentName
            );
            if (department) {
              const departmentEmployees = employees.filter(
                (e) => e.departmentId === department.id
              );
              return getEmployeesWithDepartment(
                departmentEmployees,
                departmentMap
              );
            }
          }
          return [];
      }
    },
  },
};
