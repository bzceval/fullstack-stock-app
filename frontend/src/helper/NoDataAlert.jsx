import { Alert } from "@mui/material";
import React from "react";

const NoDataAlert = ({ name }) => {
  return (
    <Alert severity="warning" sx={{ mt: 4, width: "50%" }}>
      There is no {name} to show
    </Alert>
  );
};

export default NoDataAlert;
