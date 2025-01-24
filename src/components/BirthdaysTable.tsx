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
import { Birthday } from "@/types/birthday";
import DataTable from "./DataTable";

interface BirthdaysTableProps {
  birthdays: Birthday[];
}

const BirthdaysTable: React.FC<BirthdaysTableProps> = ({ birthdays }) => {
  const columns = [
    { label: "Name", key: "name" },
    { label: "Department", key: "department" },
    { label: "Date of Birth", key: "dob" },
  ];

  return (
    <DataTable
      columns={columns}
      rows={birthdays}
      fixedHeight={true}
      noDataMessage="No birthdays this week."
    />
  );
};

export default BirthdaysTable;
