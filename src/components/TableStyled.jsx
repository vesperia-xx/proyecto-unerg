import React from "react";
import { TableContainer, Typography } from "@mui/material";
import CustomBox from "./CustomBox";

const TableStyled = ({ title, hover = false, children }) => {
  return (
    <CustomBox
      sx={{
        p: 3,
        ".MuiTableCell-root": { p: 0 },
        ".MuiTableCell-head": {
          fontSize: 13,
          py: 1,
          color: "#96A5B8",
        },
        ".MuiTableBody-root .MuiTableRow-root": {
          ":hover": hover ? { bgcolor: "#0001" } : {},
          "&:last-child td, &:last-child th": { border: 0 },
        },
        ".MuiTableCell-body": {
          fontSize: 14,
          py: 0.8,
          color: "#444A6D",
        },
		
        // barra de desplazamiento
        ".MuiTableContainer-root": {
          overflow: "auto",
          maxHeight: "400px", 
          "&::-webkit-scrollbar": {
            width: "8px", 
            height: "8px", 
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#96A5B8", 
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#75839e", 
          },
        },
      }}
    >
      {title && (
        <Typography sx={{ fontWeight: 600, fontSize: 14, color: "#96A5B8" }}>
          {title}
        </Typography>
      )}

      <div style={{ overflowX: "auto" }}>
        <TableContainer>{children}</TableContainer>
      </div>
    </CustomBox>
  );
};

export default TableStyled;