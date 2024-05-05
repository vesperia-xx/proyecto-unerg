'use client';
import React from "react";
import { Box } from "@mui/material";
import { v4 as uuid } from "uuid";
import LinkLeftPanel from "./LinkLeftPanel";

const GroupLinksLeftPanel = ({ title, links }) => {
  return (
    <Box>
      {links.map((link) => (
        <LinkLeftPanel key={uuid()} title={link.title} url={link.url} icon={link.icon} />
      ))}
    </Box>
  );
};

export default GroupLinksLeftPanel;

