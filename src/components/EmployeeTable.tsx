import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Employee } from "@/types/employee";
import DataTable from "./DataTable";

interface EmployeeTableProps {
  employees: Employee[];
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees }) => {
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
      noDataMessage="No employees on leave."
    />
  );
};

export default EmployeeTable;
