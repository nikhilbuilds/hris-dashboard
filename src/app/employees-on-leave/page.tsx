"use client";

import React, { useState } from "react";
import { gql } from "@apollo/client";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Select,
  MenuItem,
  Button,
  Grid2,
  CircularProgress,
} from "@mui/material";
import { getClient } from "@/app/lib/graphql/apollo-client";
import { exportToCSV } from "../lib/utils/exportCsv";

const GET_EMPLOYEES_ON_LEAVE = gql`
  query EmployeesOnLeave($department: String) {
    employeesOnLeave(department: $department) {
      id
      name
      department
      leaveType
      leaveStart
      leaveEnd
    }
  }
`;

export default function EmployeesOnLeave() {
  const [isLoading, setLoading] = useState(true);
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [data, setData] = useState<any[]>([]);

  const client = getClient();

  const fetchEmployees = async (department: string) => {
    const { loading, data } = await client.query({
      query: GET_EMPLOYEES_ON_LEAVE,
      variables: { department },
    });
    setLoading(loading);
    setData(data.employeesOnLeave);
  };

  const handleExport = () => {
    exportToCSV(data, "employees-on-leave");
  };
  React.useEffect(() => {
    fetchEmployees(departmentFilter);
  }, [departmentFilter]);

  if (isLoading) return <CircularProgress />;

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Employees on Leave Today
      </Typography>
      <Grid2 container spacing={8} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          displayEmpty
          sx={{ marginBottom: "16px", width: "200px" }}
        >
          <MenuItem value="">All Departments</MenuItem>
          <MenuItem value="Engineering">Engineering</MenuItem>
          <MenuItem value="HR">HR</MenuItem>
          <MenuItem value="Sales">Sales</MenuItem>
          <MenuItem value="Marketing">Marketing</MenuItem>
        </Select>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginBottom: "16px" }}
          onClick={handleExport}
        >
          Export as CSV
        </Button>
      </Grid2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Leave Type</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((employee: any) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{employee.leaveType}</TableCell>
                <TableCell>{employee.leaveStart}</TableCell>
                <TableCell>{employee.leaveEnd}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
