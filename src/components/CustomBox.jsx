"use client";
import { Box, styled } from "@mui/material";

const CustomBox = styled(Box)(({ theme }) => ({
	backgroundColor: "#fff",
	padding: theme.spacing(3),
	borderRadius: 16,
	boxShadow: theme.shadows[1],
}));

export default CustomBox;