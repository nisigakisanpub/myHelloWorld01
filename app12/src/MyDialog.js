import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';


export default function MyDialog(props) {
  const { open, rows, children } = props;
  console.log(rows);

  return (
    <Dialog open={open}>
      <DialogTitle>{children}</DialogTitle>
      <DialogContentText>
        <code>{JSON.stringify(rows)}</code>
      </DialogContentText>
    </Dialog>
  );
}

