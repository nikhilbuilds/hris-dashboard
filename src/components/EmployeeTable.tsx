import React from "react";
import { Employee } from "@/types/employee";
import DataTable from "./DataTable";

interface EmployeeTableProps {
  employees: Employee[];
  totalCount: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: unknown, newPage: number) => void;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employees,
  totalCount,
  page,
  rowsPerPage,
  onPageChange,
}) => {
  const columns = [
    { label: "Name", key: "name" },
    { label: "Department", key: "department" },
    { label: "Leave Type", key: "leaveType" },
    { label: "Start Date", key: "leaveStart" },
    { label: "End Date", key: "leaveEnd" },
  ];

  return (
    <DataTable
      columns={columns}
      rows={employees}
      fixedHeight={true}
      noDataMessage="No employees on leave."
      pagination={{
        totalCount,
        rowsPerPage,
        page,
        onPageChange,
      }}
    />
  );
};

export default EmployeeTable;
