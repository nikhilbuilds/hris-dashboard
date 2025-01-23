import React from "react";
import {
  Box,
  Button,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import Link from "next/link";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import CakeIcon from "@mui/icons-material/Cake";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";

const drawerWidth = 60;

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const menuItems = [
    { icon: <Diversity3Icon />, text: "Team Overview", path: "/team-overview" },
    {
      icon: <PauseCircleOutlineIcon />,
      text: "Employees on Leave",
      path: "/employees-on-leave",
    },
    { icon: <CakeIcon />, text: "Birthdays", path: "/birthdays" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 250,
            boxSizing: "border-box",
            backgroundColor: "#f4f4f4",
            borderRight: "1px solid #ddd",
          },
        }}
      >
        <Link href={"/"} passHref style={{ textDecoration: "none" }}>
          <Typography
            variant="h6"
            align="center"
            sx={{ padding: "16px", fontWeight: "bold", color: "#24212175" }}
          >
            HRIS Dashboard{" "}
          </Typography>
        </Link>

        <List>
          {menuItems.map((item) => (
            <Link href={item.path} passHref style={{ textDecoration: "none" }}>
              <ListItemButton
                key={item.text}
                sx={{
                  my: 0,
                  minHeight: 60,
                  color: "black",
                }}
              >
                <ListItemIcon sx={{ color: "inherit" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </Link>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#f4f4f4",
          p: 4,
          margin: `${drawerWidth}px`,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
