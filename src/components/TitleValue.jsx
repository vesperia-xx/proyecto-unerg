import React from "react";
import { Box, Typography } from "@mui/material";

const TitleValue = ({ title, value, valueToRender }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        mt: 2,
      }}
    >
      <Typography
        sx={{
          mr: { xs: 1, md: 0 },
          fontWeight: "600",
          color: "#05004E",
          width: { xs: "auto", md: "160px" },
          fontSize: 14
        }}
      >
        {title}:
      </Typography>

      {valueToRender}
    </Box>
  );
};

export default TitleValue;

