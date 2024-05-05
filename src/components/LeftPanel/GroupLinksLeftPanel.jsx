import React from "react";
import { Box } from "@mui/material";
import { v4 as uuid } from "uuid";
import LinkLeftPanel from "./LinkLeftPanel";

const GroupLinksLeftPanel = ({ groups }) => {
  console.log(groups); 

  return (
    <Box>
      {groups.map((group) => (
        <div key={uuid()}>
          <h3>{group.title}</h3>
          {group.links.map((link) => (
            <LinkLeftPanel key={uuid()} title={link.title} url={link.url} icon={link.icon} />
          ))}
        </div>
      ))}
    </Box>
  );
};

export default GroupLinksLeftPanel;