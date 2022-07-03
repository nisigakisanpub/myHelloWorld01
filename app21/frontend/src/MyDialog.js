import React from "react";
import { Dialog, DialogTitle, DialogContentText } from "@mui/material";
import { blue } from "@mui/material/colors";

export default function MyDialog(props) {
  const { open, rows, children } = props;

  return (
    <Dialog open={open}>
      <DialogTitle>{children}</DialogTitle>
      <DialogContentText>
        <code>{JSON.stringify(rows)}</code>
      </DialogContentText>
    </Dialog>
  );
}
