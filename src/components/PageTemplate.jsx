"use client";
import React from "react";
import Box from "@mui/material/Box";

const PageTemplate = ({ children, UI_Settings }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "98vh",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: "#FAFBFC",
        }}
      >
        <Box
          sx={{
            mr: 0,
            px: 3,
            pt: 11,
            flexGrow: 1,
            maxHeight: "99vh",
            overflowY: "auto",
          }}
        >
          {children}
        </Box>
      </Box>
    </>
  );
};

export default PageTemplate;