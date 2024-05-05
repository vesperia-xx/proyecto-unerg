import React, { useState } from "react";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Link from "next/link";

const LinkLeftPanel = ({ url, title, icon }) => {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
  };

  return (
    <ListItemButton
      selected={selected}
      onClick={handleClick}
      sx={{
        mb: 0,
        color: selected ? "#4079ED" : "#737791",
      }}
    >
      <Link href={url}>
        
          <ListItemIcon sx={{ color: selected ? "#FFFFFF" : "#737791" }}>
            {icon}
          </ListItemIcon>
          <ListItemText
            sx={{ color: selected ? "#FFFFFF" : "#737791" }}
            primary={title}
          />
        
      </Link>
    </ListItemButton>
  );
};

export default LinkLeftPanel;