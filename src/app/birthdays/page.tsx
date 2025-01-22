"use client";

import React, { useState, useEffect } from "react";
import { gql } from "@apollo/client";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Paper,
  Button,
} from "@mui/material";
import { getClient } from "@/app/lib/graphql/apollo-client";
import { exportToCSV } from "../lib/utils/exportCsv";

// GraphQL Query
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

function isToday(date: string): boolean {
  const today = new Date();
  const inputDate = new Date(date);

  return (
    today.getDate() === inputDate.getDate() &&
    today.getMonth() === inputDate.getMonth()
  );
}

export default function Birthdays() {
  const [data, setData] = useState<any[]>([]);
  const client = getClient();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await client.query({ query: GET_BIRTHDAYS_THIS_WEEK });
      setData(data.birthdaysThisWeek);
    };
    fetchData();
  }, []);

  const handleExport = () => {
    exportToCSV(data, "birthdays_this_week");
  };

  return (
    <Paper elevation={3} sx={{ padding: "16px" }}>
      <Typography variant="h4" gutterBottom>
        Birthdays This Week
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginBottom: "16px" }}
        onClick={handleExport}
      >
        Export as CSV
      </Button>
      <List>
        {data.map((employee) => {
          const isBirthdayToday = isToday(employee.dob);

          return (
            <ListItem key={employee.id} sx={{ marginBottom: "8px" }}>
              <Avatar sx={{ marginRight: "16px" }}>{employee.name[0]}</Avatar>
              <ListItemText
                primary={`${employee.name} - ${employee.department}`}
                secondary={`Date of Birth: ${employee.dob}`}
                slotProps={{
                  primary: {
                    fontWeight: isBirthdayToday ? "bold" : "normal",
                    color: isBirthdayToday ? "primary" : "inherit",
                  },
                }}
              />
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
}
