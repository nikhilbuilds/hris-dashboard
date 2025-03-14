import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import CakeIcon from "@mui/icons-material/Cake";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import Link from "next/link";
import { useRouter } from "next/router";

const drawerWidth = 240;

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const isActiveRoute = (path: string) => {
    if (path === "/team-overview") {
      return router.pathname === path || router.pathname === "/";
    }
    return router.pathname === path;
  };

  const menuItems = [
    { icon: <Diversity3Icon />, text: "Team overview", path: "/team-overview" },
    {
      icon: <PauseCircleOutlineIcon />,
      text: "Employees on leave",
      path: "/employees-on-leave",
    },
    { icon: <CakeIcon />, text: "Birthdays", path: "/birthdays" },
  ];

  const drawerContent = (
    <Box>
      <Typography
        variant="h6"
        align="center"
        sx={{
          padding: "16px",
          fontWeight: "bold",
          color: "#BB86FC",
          marginTop: isMobile ? 7 : 4,
        }}
      >
        HRIS Dashboard
      </Typography>
      <List>
        {menuItems.map((item) => (
          <Link
            key={item.text}
            href={item.path}
            passHref
            style={{ textDecoration: "none" }}
          >
            <ListItemButton
              sx={{
                my: 0,
                minHeight: 60,
                color: "white",
                backgroundColor: isActiveRoute(item.path)
                  ? "#333333"
                  : "transparent",
                "&:hover": {
                  backgroundColor: "#333333",
                },
              }}
              onClick={handleDrawerToggle}
            >
              <ListItemIcon
                sx={{
                  color: isActiveRoute(item.path)
                    ? "#BB86FC"
                    : "rgba(187, 134, 252, 0.7)",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  "& .MuiListItemText-primary": {
                    color: isActiveRoute(item.path) ? "#BB86FC" : "white",
                  },
                }}
              />
            </ListItemButton>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {isMounted && isMobile && (
        <AppBar
          position="fixed"
          sx={{
            zIndex: theme.zIndex.drawer + 1,
            backgroundColor: "#1E1E1E",
            color: "white",
          }}
        >
          <Toolbar>
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ marginRight: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6">HRIS Dashboard</Typography>
          </Toolbar>
        </AppBar>
      )}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        anchor="left"
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#1E1E1E",
            color: "white",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#121212",
          color: "white",
          paddingY: isMobile ? 10 : 6,
          paddingX: isMobile ? 2 : 5,
          minHeight: "100vh",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
