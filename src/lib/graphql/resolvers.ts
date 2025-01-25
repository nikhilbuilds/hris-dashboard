import { employees, departments, leaveRecords } from "../data/mock-data";

export const resolvers = {
  Query: {
    employeesOnLeave: (
      _: any,
      args: { page?: number; limit?: number; department?: string }
    ) => {
      const { page, limit, department } = args;
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const departmentMap = new Map(departments.map((d) => [d.id, d.name]));
      const employeeMap = new Map(employees.map((e) => [e.id, e]));

      const employeesOnLeaveMap = new Map();

      leaveRecords.forEach((record: any) => {
        const leaveStart = new Date(record.leaveStart);
        const leaveEnd = new Date(record.leaveEnd);
        leaveStart.setHours(0, 0, 0, 0);
        leaveEnd.setHours(0, 0, 0, 0);

        if (today >= leaveStart && today <= leaveEnd) {
          const employee = employeeMap.get(record.employeeId);
          if (!employee) return;

        const departmentName = departmentMap.get(employee.departmentId);

        if (department && departmentName !== department) return;

          employeesOnLeaveMap.set(employee.id, {
            ...employee,
            department: departmentName,
            leaveType: record.leaveType,
            leaveStart: record.leaveStart,
            leaveEnd: record.leaveEnd,
          });
        }
      });

      const filteredEmployees = Array.from(employeesOnLeaveMap.values());

      if (!page || !limit) {
        return {
          employees: filteredEmployees,
          totalCount: filteredEmployees.length,
        };
      }

      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedEmployees = filteredEmployees.slice(startIndex, endIndex);

      return {
        employees: paginatedEmployees,
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
      const employeesOnLeave = leaveRecords.length;
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
    getDepartmentList:() => {
      return departments;
    }
  },
};
