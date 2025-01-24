import React from "react";
import Grid2 from "@mui/material/Grid2";
import { gql } from "@apollo/client";
import { getClient } from "@/lib/graphql/apollo-client";
import { exportToCSV } from "@/lib/utils/exportCsv";
import { formatDate } from "@/lib/utils/dateFormatter";
import { Birthday } from "@/types/birthday";
import ErrorMessage from "@/components/ErrorMessage";
import BirthdaysTable from "@/components/BirthdaysTable";
import PageHeader from "@/components/PageHeader";
import { Button } from "@mui/material";

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
      dob: formatDate(birthday.dob),
    }));

    console.log(formattedBirthdays);

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

interface BirthdaysPageProps {
  birthdays: Birthday[];
  error?: string;
}

export default function Birthdays({ birthdays, error }: BirthdaysPageProps) {
  if (error) {
    return <ErrorMessage message={error} />;
  }

  const handleExport = () => {
    exportToCSV(birthdays, "birthdays");
  };

  return (
    <div>
      <PageHeader title="Birthdays this week">
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
      <Grid2 container>
        <BirthdaysTable birthdays={birthdays} />
      </Grid2>
    </div>
  );
}
