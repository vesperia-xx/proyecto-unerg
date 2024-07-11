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
        ".MuiTableBody-root .MuiTableRow-root:hover": {
          backgroundColor: hover ? "#f5f5f5" : "inherit",
        },
        ".MuiTableCell-body": {
          fontSize: 14,
          py: 0.8,
          color: "#444A6D",
        },
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
        <TableContainer sx={{ "& .MuiTableRow-root:hover": { backgroundColor: hover ? "#f5f5f5" : "inherit" } }}>
          {children}
        </TableContainer>
      </div>
    </CustomBox>
  );
};

export default TableStyled;

