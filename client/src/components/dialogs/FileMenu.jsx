import React from "react";
import { Menu } from "@mui/material";
const FileMenu = ({ anchorEl }) => {
  return (
    <Menu anchorEl={anchorEl} open={false}>
      <div style={{ width: "10rem" }}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae, aliquam
        rem dolor neque obcaecati doloremque esse voluptatibus aut quod
        incidunt?
      </div>
    </Menu>
  );
};

export default FileMenu;
