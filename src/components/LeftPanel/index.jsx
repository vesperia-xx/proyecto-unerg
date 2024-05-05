'use client';
import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Divider from "@mui/material/Divider";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Image from "next/image";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import RouterLinks from "@/routes/RouterLinks";

const drawerWidth = 240;

function LeftPanel(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Left Panel
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: drawerWidth, flexShrink: 0 }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { width: drawerWidth },
          }}
        >
          <Divider />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": { width: drawerWidth },
          }}
          open
        >
          <Box
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "120px",
            }}
          >
            <div style={{ width: "130px", height: "70px" }}>
              <Image
                src="/logo_unerg.png"
                width={130}
                height={70}
                alt="Logo de la UNERG"
                priority
              />
            </div>
            <Typography
              variant="h6"
              style={{ color: "#151D48", fontWeight: "bold", marginTop: "5px" }}
            >
              UNERG
            </Typography>
          </Box>

          <Divider />
          <List>
            <ListItem button key="Estudiantes" component="a" href={RouterLinks.admin.pasantias.pasantias}>
              <ListItemIcon><PeopleAltIcon /></ListItemIcon>
              <ListItemText primary="Estudiantes" />
            </ListItem>
          </List>

        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Box>
          <Box
            sx={{
              pb: 0.5,
              backgroundColor: "#fff",
              zIndex: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
          </Box>
          <Divider sx={{ my: 0.5 }} />
        </Box>
      </Box>
    </Box>
  );
}

LeftPanel.propTypes = {
  window: PropTypes.func,
};

export default LeftPanel;

