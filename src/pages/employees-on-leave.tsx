import React from "react";
import Grid2 from "@mui/material/Grid2";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  Button,
  MenuItem,
} from "@mui/material";
import { gql } from "@apollo/client";
import { getClient } from "@/lib/graphql/apollo-client";
import { exportToCSV } from "../lib/utils/exportCsv";
import { useRouter } from "next/router";

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

export async function getServerSideProps(context: any) {
  const client = getClient();
  const department = context.query.department || "";

  try {
    const { data } = await client.query({
      query: GET_EMPLOYEES_ON_LEAVE,
      variables: { department },
    });

    return {
      props: {
        employeesOnLeave: data.employeesOnLeave,
        department,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);

    return {
      props: {
        employeesOnLeave: [],
        error: "Failed to fetch employees on leave.",
      },
    };
  }
}

interface EmployeesOnLeaveProps {
  employeesOnLeave: {
    id: string;
    name: string;
    department: string;
    leaveType: string;
    leaveStart: string;
    leaveEnd: string;
  }[];
  department: string;
  error?: string;
}

export default function EmployeesOnLeave({
  employeesOnLeave,
  department,
  error,
}: EmployeesOnLeaveProps) {
  const router = useRouter();

  if (error) {
    return (
      <Typography
        variant="h6"
        color="error"
        align="center"
        sx={{ marginTop: "20px" }}
      >
        {error}
      </Typography>
    );
  }

  const handleFilterChange = (event: any) => {
    const selectedDepartment = event.target.value as string;

    router.push({
      pathname: "/employees-on-leave",
      query: selectedDepartment ? { department: selectedDepartment } : {},
    });
  };

  return (
    <div>
      <Grid2
        container
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Employees on Leave Today
        </Typography>

        <Button
          variant="contained"
          color="primary"
          sx={{ marginBottom: "16px" }}
          onClick={() => exportToCSV(employeesOnLeave, "employee_on_leave")}
        >
          Export as CSV
        </Button>
      </Grid2>
      <Grid2
        container
        spacing={8}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        marginTop={2}
      >
        <Select
          value={department}
          onChange={handleFilterChange}
          displayEmpty
          sx={{ marginBottom: "16px", width: "200px" }}
        >
          <MenuItem value="">All Departments</MenuItem>
          <MenuItem value="Engineering">Engineering</MenuItem>
          <MenuItem value="HR">HR</MenuItem>
          <MenuItem value="Sales">Sales</MenuItem>
          <MenuItem value="Marketing">Marketing</MenuItem>
        </Select>
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
            {employeesOnLeave.map((employee: any) => (
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
