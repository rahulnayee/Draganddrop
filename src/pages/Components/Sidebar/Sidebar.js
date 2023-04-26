import { sidebarMenu } from "@/Assets/comman/common";
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from "@mui/material";

import React from "react";

const Sidebar = ({ manageHeader, handleManageHeader }) => {
  return (
    <React.Fragment>
      <SwipeableDrawer
        open={manageHeader.drawer}
        onClose={() => handleManageHeader("drawer", !manageHeader.drawer)}
        onOpen={() => handleManageHeader("drawer", !manageHeader.drawer)}
      >
        <Box role="presentation">
          <List>
            {[
              "Home",
              "General Information",
              "Resolution & Regions",
              "Designer",
              "Scheduler",
              "Network",
              "Player Information",
              "projects Information",
              "Channels Publishing",
              "Users & Permissions",
            ].map((item, index) => {
              return (
                <ListItem key={index} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>@</ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </SwipeableDrawer>
    </React.Fragment>
  );
};

export default Sidebar;
