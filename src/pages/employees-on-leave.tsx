import React from "react";
import Grid2 from "@mui/material/Grid2";
import { Button } from "@mui/material";
import { getClient } from "@/lib/graphql/apollo-client";
import { useRouter } from "next/router";
import { Department, Employee } from "@/types/employee";
import ErrorMessage from "@/components/ErrorMessage";
import FilterSelect from "@/components/FilterSelect";
import EmployeeTable from "@/components/EmployeeTable";
import PageHeader from "@/components/PageHeader";
import { formatDate } from "@/lib/utils/dateFormatter";
import { useGlobalLoader } from "@/context/LoaderContext";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { handleExport } from "@/lib/utils/exportHandler";
import { GET_DEPARTMENT_LIST, GET_EMPLOYEES_ON_LEAVE } from "@/lib/graphql/queries";


export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const client = getClient();
  const department = context.query.department || "";
  const page = parseInt(context.query.page as string || "1");
  const limit = 10;
  try {
    const { data } = await client.query({
      query: GET_EMPLOYEES_ON_LEAVE,
      variables: { page, limit, department },
    });

    const departments = await client.query({
      query: GET_DEPARTMENT_LIST,
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
        departmentList: departments.data.getDepartmentList,
        totalCount: data.employeesOnLeave.totalCount,
        department,
        currentPage: page,
      },
    };
  } catch (error: any) {
    console.error("Error fetching data(EMPLOYEES_ON_LEAVE):", error);

    return {
      props: {
        employeesOnLeave: [],
        totalCount: 0,
        department,
        currentPage: 1,
        error: "Failed to fetch employees on leave",
      },
    };
  }
}

interface EmployeesOnLeaveProps {
  employeesOnLeave: Employee[];
  department: string;
  departmentList: Department[];
  totalCount: number;
  currentPage: number;
  error?: string;
}

export default function EmployeesOnLeave(props: EmployeesOnLeaveProps) {
  const {
    employeesOnLeave,
    departmentList,
    totalCount,
    currentPage,
    department,
    error,
  } = props;

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

  const handleCSVExport = async () => {
    await handleExport(
      client,
      "ON_LEAVE",
      "employees_on_leave",
      setLoading,
      { department }
    );
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
          onClick={handleCSVExport}
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
        <FilterSelect
          departmentList={departmentList}
          department={department}
          onChange={handleFilterChange}
        />
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
