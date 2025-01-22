export const resolvers = {
  Query: {
    employeesOnLeave: (_: any, args: { department?: string }) => {
      const employees = [
        {
          id: "1",
          name: "Alice Johnson",
          department: "Engineering",
          leaveType: "Sick Leave",
          leaveStart: "2025-01-21",
          leaveEnd: "2025-01-25",
        },
        {
          id: "2",
          name: "Bob Smith",
          department: "HR",
          leaveType: "Annual Leave",
          leaveStart: "2025-01-22",
          leaveEnd: "2025-01-26",
        },
      ];

      if (args.department) {
        return employees.filter((e) => e.department === args.department);
      }
      return employees;
    },
    birthdaysThisWeek: () => [
      {
        id: "3",
        name: "Charlie Brown",
        department: "Sales",
        dob: "1995-01-23",
      },
      {
        id: "4",
        name: "Daisy Miller",
        department: "Marketing",
        dob: "1997-01-22",
      },
    ],
    teamOverview: () => ({
      totalEmployees: 100,
      activeEmployees: 85,
      employeesOnLeave: 15,
      departmentBreakdown: [
        { department: "Engineering", count: 40 },
        { department: "Sales", count: 20 },
        { department: "HR", count: 10 },
        { department: "Marketing", count: 30 },
      ],
    }),
  },
};
