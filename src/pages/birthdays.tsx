import React from "react";
import Grid2 from "@mui/material/Grid2";
import { getClient } from "@/lib/graphql/apollo-client";
import { exportToCSV } from "@/lib/utils/exportCsv";
import { formatToDateMonth } from "@/lib/utils/dateFormatter";
import { Birthday } from "@/types/birthday";
import ErrorMessage from "@/components/ErrorMessage";
import BirthdaysTable from "@/components/BirthdaysTable";
import PageHeader from "@/components/PageHeader";
import { GET_BIRTHDAYS } from "@/lib/graphql/queries";
import ExportButton from "@/components/ExportButton";


export async function getServerSideProps() {
  const client = getClient();

  try {
    const { data } = await client.query({
      query: GET_BIRTHDAYS,
    });

    const formattedBirthdays = data.birthdaysThisWeek.map(
      (birthday: Birthday) => ({
        ...birthday,
        dob: formatToDateMonth(birthday.dob),
      })
    );

    return {
      props: {
        birthdays: formattedBirthdays,
      },
    };
  } catch (error) {
    console.error("Error fetching data(BIRTHDAY):", error);

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
  if (error) return <ErrorMessage message={error} />;

  const handleExport = () => {
    exportToCSV(birthdays, "birthdays");
  };

  return (
    <div>
      <PageHeader title="Birthdays this week">
      <ExportButton 
        onClick={handleExport} 
        variant="contained"
        label="Export as CSV"
      />

      </PageHeader>
      <Grid2 container>
        <BirthdaysTable birthdays={birthdays} />
      </Grid2>
    </div>
  );
}
