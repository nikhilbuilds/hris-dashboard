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
import { formatDate } from "@/lib/utils/dateFormatter";
import { useGlobalLoader } from "@/context/LoaderContext";

const GET_EMPLOYEES_ON_LEAVE = gql`
  query EmployeesOnLeave($page: Int, $limit: Int, $department: String) {
    employeesOnLeave(page: $page, limit: $limit, department: $department) {
      employees {
        id
        name
        department
        leaveType
        leaveStart
        leaveEnd
      }
      totalCount
    }
  }
`;

const GET_ALL_EMPLOYEES_ON_LEAVE = gql`
  query AllEmployeesOnLeave($department: String) {
    employeesOnLeave(department: $department) {
      employees {
        id
        name
        department
        leaveType
        leaveStart
        leaveEnd
      }
    }
  }
`;

export async function getServerSideProps(context: any) {
  const client = getClient();
  const department = context.query.department || "";
  const page = parseInt(context.query.page || "1");
  const limit = 10;
  try {
    const { data } = await client.query({
      query: GET_EMPLOYEES_ON_LEAVE,
      variables: { page, limit, department },
    });

    const formattedEmployeesOnLeave = data.employeesOnLeave.employees.map(
      (employee: Employee) => ({
        ...employee,
        leaveStart: formatDate(employee.leaveStart),
        leaveEnd: formatDate(employee.leaveEnd),
      })
    );

    return {
      props: {
        employeesOnLeave: formattedEmployeesOnLeave,
        totalCount: data.employeesOnLeave.totalCount,
        department,
        currentPage: page,
      },
    };
  } catch (error: any) {
    console.error("Error fetching data:", error);

    return {
      props: {
        employeesOnLeave: [],
        totalCount: 0,
        department,
        currentPage: 1,
        error: handleError(error),
      },
    };
  }
}

interface EmployeesOnLeaveProps {
  employeesOnLeave: Employee[];
  department: string;
  totalCount: number;
  currentPage: number;
  error?: string;
}

export default function EmployeesOnLeave({
  employeesOnLeave,
  totalCount,
  currentPage,
  department,
  error,
}: EmployeesOnLeaveProps) {
  const router = useRouter();
  const client = getClient();
  const { setLoading } = useGlobalLoader();

  if (error) return <ErrorMessage message={error} />;
  

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDepartment = event.target.value;

    router.push({
      pathname: "/employees-on-leave",
      query: selectedDepartment ? { department: selectedDepartment } : {},
    });
  };

  const handlePageChange = (event: unknown, newPage: number) => {
    router.push({
      pathname: "/employees-on-leave",
      query: {
        department,
        page: newPage + 1,
      },
    });
  };

  const handleExport = async () => {
    try {
      setLoading(true);
      const { data } = await client.query({
        query: GET_ALL_EMPLOYEES_ON_LEAVE,
        variables: { department },
      });

      const formattedData = data.employeesOnLeave.employees.map(
        (employee: Employee) => ({
          id: employee.id,
          name: employee.name,
          department: employee.department,
          "Leave type": employee.leaveType,
          "Leave start date": formatDate(employee.leaveStart),
          "Leave end date": formatDate(employee.leaveEnd),
        })
      );

      exportToCSV(formattedData, "employees_on_leave");
    } catch (error) {
      handleError("Error exporting data:");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader title="Employees on leave today">
        <Button
          variant="contained"
          sx={{
            backgroundColor: "secondary.main",
            color: "common.white",
            "&:hover": {
              backgroundColor: "secondary.dark",
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
      <EmployeeTable
        employees={employeesOnLeave}
        totalCount={totalCount}
        page={currentPage - 1}
        rowsPerPage={10}
        onPageChange={handlePageChange}
      />
    </>
  );
}
