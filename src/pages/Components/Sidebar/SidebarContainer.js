import React, { useState } from "react";
import Sidebar from "./Sidebar";

const SidebarContainer = ({ manageHeader, handleManageHeader }) => {
  const [manageSidebar, setManageSidebar] = useState({
    drawer: false,
  });
  const handleManageSidebar = (key, value) => {
    setManageSidebar({
      ...manageSidebar,
      [key]: value,
    });
  };
  return (
    <Sidebar
      manageHeader={manageHeader}
      handleManageHeader={handleManageHeader}
    />
  );
};

export default SidebarContainer;
