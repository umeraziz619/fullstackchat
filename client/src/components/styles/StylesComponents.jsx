import { styled } from "@mui/material";
import { Link as LinkComponent } from "react-router-dom";
import { grayColor } from "../../constant/color";
export const VisuallyHiddenInput = styled("input")({
  // border:0,
  clip: "rect(0 0 0 0)",
  height: 10,
  margin: -1,
  overflow: "hidden",
  padding: 10,
  position: "absolute",
  whiteSpace: "nowrap",
  width: 10,
  borderWidth: 4,
  borderColor: "red",
});
export const Link = styled(LinkComponent)`
  text-decoration: none;
  color: black;
  padding: 1rem;
  &:hover {
    background-color: #f0f0f0;
  }
`;
export const InputBox = styled("input")`
 width:100%;
height:100%;
border:none;
outline:none;
padding 0 3rem;
border-radius:1.5rem;
padding-left:3rem;
background-color: ${grayColor};
`;
