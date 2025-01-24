import React from "react";
import Grid2 from "@mui/material/Grid2";
import { Typography, Button } from "@mui/material";
import { gql } from "@apollo/client";
import { getClient } from "@/lib/graphql/apollo-client";
import { exportToCSV } from "@/lib/utils/exportCsv";
import { useRouter } from "next/router";
import { handleError } from "@/lib/utils/errorHandler";
import { Employee } from "@/types/employee";
import ErrorMessage from "@/components/ErrorMessage";
import FilterSelect from "@/components/FilterSelect";
import EmployeeTable from "@/components/EmployeeTable";
import PageHeader from "@/components/PageHeader";

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
  } catch (error: any) {
    console.error("Error fetching data:", error);

    return {
      props: {
        employeesOnLeave: [],
        error: handleError(error),
      },
    };
  }
}

interface EmployeesOnLeaveProps {
  employeesOnLeave: Employee[];
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
    return <ErrorMessage message={error} />;
  }

  const handleFilterChange = (event: any) => {
    const selectedDepartment = event.target.value as string;

    router.push({
      pathname: "/employees-on-leave",
      query: selectedDepartment ? { department: selectedDepartment } : {},
    });
  };

  const handleExport = () => {
    exportToCSV(employeesOnLeave, "employee_on_leave");
  };

  return (
    <div>
      <PageHeader title="Employees on leave today">
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#9C27B0",
            color: "#FFFFFF",
            "&:hover": {
              backgroundColor: "#7B1FA2",
            },
          }}
          onClick={handleExport}
        >
          Export as CSV
        </Button>
      </PageHeader>
      <Grid2
        container
        spacing={8}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        marginTop={2}
      >
        <FilterSelect department={department} onChange={handleFilterChange} />
      </Grid2>
      <EmployeeTable employees={employeesOnLeave} />
    </div>
  );
}
