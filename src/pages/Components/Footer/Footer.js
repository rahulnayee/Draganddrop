import { Grid } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Grid
      container
      spacing={2}
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Grid item xs={12}>
        Footer @copyright 2023
      </Grid>
    </Grid>
  );
};

export default Footer;
