import React from "react";
import Grid2 from "@mui/material/Grid2";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { gql } from "@apollo/client";
import { getClient } from "@/pages/lib/graphql/apollo-client";
import moment from "moment";
import { exportToCSV } from "./lib/utils/exportCsv";

const GET_BIRTHDAYS_THIS_WEEK = gql`
  query BirthdaysThisWeek {
    birthdaysThisWeek {
      id
      name
      department
      dob
    }
  }
`;

export async function getServerSideProps() {
  const client = getClient();

  try {
    const { data } = await client.query({
      query: GET_BIRTHDAYS_THIS_WEEK,
    });

    const formattedBirthdays = data.birthdaysThisWeek.map((birthday: any) => ({
      ...birthday,
      dob: moment(birthday.dob).format("LL"),
    }));

    return {
      props: {
        birthdays: formattedBirthdays,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);

    return {
      props: {
        birthdays: [],
        error: "Failed to fetch birthdays this week.",
      },
    };
  }
}

interface BirthdaysProps {
  birthdays: {
    id: string;
    name: string;
    department: string;
    dob: string;
  }[];
  error?: string;
}

export default function Birthdays({ birthdays, error }: BirthdaysProps) {
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
          Birthdays This Week
        </Typography>

        <Button
          variant="contained"
          color="primary"
          sx={{ marginBottom: "16px" }}
          onClick={() => exportToCSV(birthdays, "birthdays")}
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
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Date of Birth</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {birthdays.length > 0 ? (
                birthdays.map((birthday) => (
                  <TableRow key={birthday.id}>
                    <TableCell>{birthday.name}</TableCell>
                    <TableCell>{birthday.department}</TableCell>
                    <TableCell>{birthday.dob}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No birthdays this week.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid2>
    </div>
  );
}
