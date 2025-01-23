import { employees, departments, leaveRecords } from "../data/mock-data";

export const resolvers = {
  Query: {
    employeesOnLeave: (_: any, args: { department?: string }) => {
      let employeesOnLeave = leaveRecords.map((leave) => {
        const employee = employees.find((e) => e.id === leave.employeeId);
        const department = departments.find(
          (d) => d.id === employee?.departmentId
        );

        return {
          ...leave,
          name: employee?.name,
          department: department?.name,
        };
      });

      if (args.department) {
        employeesOnLeave = employeesOnLeave.filter(
          (e) => e.department === args.department
        );
      }

      return employeesOnLeave;
    },

    birthdaysThisWeek: () => {
      const today = new Date();
      const weekStart = new Date(today);
      const weekEnd = new Date(today);

      weekStart.setDate(today.getDate() - today.getDay());
      weekEnd.setDate(weekStart.getDate() + 6);

      return employees
        .filter((employee) => {
          const dob = new Date(employee.dob);
          const birthdayThisYear = new Date(
            today.getFullYear(),
            dob.getMonth(),
            dob.getDate()
          );
          return birthdayThisYear >= weekStart && birthdayThisYear <= weekEnd;
        })
        .map((employee) => ({
          id: employee.id,
          name: employee.name,
          department: departments.find((d) => d.id === employee.departmentId)
            ?.name,
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
  },
};
