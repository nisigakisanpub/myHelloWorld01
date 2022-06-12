import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const OneLine = () => {
  return (
      <Grid container spacing={2} sx={{ width: "1024px" }}>
        <Grid item xs={8}>
          <Item>xs=8</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>xs=4</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>xs=4</Item>
        </Grid>
        <Grid item xs={8}>
          <Item>xs=8</Item>
        </Grid>
      </Grid>
  );
}

export default function MyController() {
  return (
    <Box sx={{ flexGrow: 1, overflow: "scroll", width: "50%", height: "200px" }}>
      <OneLine />
      <OneLine />
      <OneLine />
      <OneLine />
      <OneLine />
      <OneLine />
      <OneLine />
      <OneLine />
      <OneLine />
      <OneLine />
      <OneLine />
    </Box>
  );
}

