import React, { useState } from "react";
import Header from "./Header";

const HeaderContainer = () => {
  const [manageHeader, setManageHeader] = useState({
    drawer: false,
  });
  const handleManageHeader = (key, value) => {
    setManageHeader({
      ...manageHeader,
      [key]: value,
    });
  };
  return (
    <Header
      manageHeader={manageHeader}
      handleManageHeader={handleManageHeader}
    />
  );
};

export default HeaderContainer;
