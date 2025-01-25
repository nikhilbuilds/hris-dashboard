import { ApolloClient } from "@apollo/client";
import { exportToCSV } from "./exportCsv";
import { handleError } from "./errorHandler";
import {
  GET_EMPLOYEES,
  GET_BIRTHDAYS,
  GET_EMPLOYEES_ON_LEAVE,
} from "../graphql/queries";
import { EmployeeFilter } from "@/types/employeeFilter";
import { formatDate } from "./dateFormatter";
import { Employee } from "@/types/employee";

type ExportType = "EMPLOYEES" | "BIRTHDAYS" | "ON_LEAVE";

interface ExportConfig {
  query: any;
  variables?: Record<string, any>;
  dataPath: string;
  formatData: (data: any) => Record<string, any>[];
}

const exportConfigs: Record<ExportType, ExportConfig> = {
  EMPLOYEES: {
    query: GET_EMPLOYEES,
    dataPath: "employees",
    formatData: (employees: Employee[]) =>
      employees.map((employee) => ({
        id: employee.id,
        name: employee.name,
        department: employee.department,
        ...(employee.leaveType && {
          "Leave type": employee.leaveType,
          "Leave start": formatDate(employee.leaveStart),
          "Leave end": formatDate(employee.leaveEnd),
        }),
      })),
  },
  BIRTHDAYS: {
    query: GET_BIRTHDAYS,
    dataPath: "birthdaysThisWeek",
    formatData: (employees: Employee[]) =>
      employees.map((employee) => ({
        id: employee.id,
        name: employee.name,
        department: employee.department,
        "Date of Birth": employee.dob ? formatDate(employee.dob) : "",
      })),
  },
  ON_LEAVE: {
    query: GET_EMPLOYEES_ON_LEAVE,
    dataPath: "employeesOnLeave.employees",
    formatData: (employees: Employee[]) =>
      employees.map((employee) => ({
        id: employee.id,
        name: employee.name,
        department: employee.department,
        "Leave type": employee.leaveType,
        "Leave start": formatDate(employee.leaveStart),
        "Leave end": formatDate(employee.leaveEnd),
      })),
  },
};

export const handleExport = async (
  client: ApolloClient<any>,
  type: ExportType,
  filename: string,
  setLoading: (loading: boolean) => void,
  variables?: Record<string, any>
) => {
  try {
    setLoading(true);
    const config = exportConfigs[type];

    const { data } = await client.query({
      query: config.query,
      variables,
    });

    const rawData = config.dataPath
      .split(".")
      .reduce((obj, key) => obj[key], data);
    const formattedData = config.formatData(rawData);

    exportToCSV(formattedData, filename);
  } catch (error) {
    handleError("Failed to export data");
  } finally {
    setLoading(false);
  }
};
