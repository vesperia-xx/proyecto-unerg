import React from "react";
import { Box, Typography } from "@mui/material";

const TitleValue = ({ title, value, strong, gutterBottom }) => {
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
      </Typography >

      <Typography sx={{ color: "#737791", fontWeight: strong ? 600 : 300, fontSize: 14 }}>
        {value}
      </Typography>

      <Typography variant="h6" component="div" sx={{ color: "blue", fontWeight: 600 }}>
        {gutterBottom}
      </Typography>

    </Box>
  );
};

export default TitleValue;

