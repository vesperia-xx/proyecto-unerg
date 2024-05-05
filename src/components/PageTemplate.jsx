import React from "react";
import Box from "@mui/material/Box";
import LeftPanel from "@/components/LeftPanel";
import { useMediaQuery } from "@mui/material";

const PageTemplate = ({ children, logo, showLeftPanel = true, groupLinks }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const leftPanelWidth = isMobile || !showLeftPanel ? 0 : 250; 

  return (
    <>
      {showLeftPanel && ( 
        <LeftPanel
          logo={logo}
          groupLinks={groupLinks} 
        />
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "98vh",
          position: "absolute",
          top: 0,
          left: leftPanelWidth,
          right: 0,
          bottom: 0,
          bgcolor: "#FAFBFC",
          overflow: "hidden",
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