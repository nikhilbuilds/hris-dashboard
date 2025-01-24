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

interface BirthdaysTableProps {
  birthdays: Birthday[];
}

const BirthdaysTable: React.FC<BirthdaysTableProps> = ({ birthdays }) => {
  return (
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
  );
};

export default BirthdaysTable;
