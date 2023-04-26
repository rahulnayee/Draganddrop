import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SidebarContainer from "../Sidebar/SidebarContainer";
import { Avatar, Tooltip } from "@mui/material";

const Header = ({ manageHeader, handleManageHeader }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => handleManageHeader("drawer", !manageHeader.drawer)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Home
        </Typography>
        <Tooltip title="Login">
          <IconButton onClick={() => {}} sx={{ p: 0 }}>
            <Avatar alt="User" src="/static/images/avatar/2.jpg" />
          </IconButton>
        </Tooltip>
        <Button color="inherit">Login</Button>
      </Toolbar>
      <SidebarContainer
        manageHeader={manageHeader}
        handleManageHeader={handleManageHeader}
      />
    </AppBar>
  );
};

export default Header;
