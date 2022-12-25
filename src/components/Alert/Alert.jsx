import * as React from 'react';
import MaterialAlert from '@mui/material/alert';
import Stack from '@mui/material/Stack';
export default function Alert() {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <MaterialAlert variant="filled" severity="error">
        This is an error alert — check it out!
      </MaterialAlert>
      <MaterialAlert variant="filled" severity="warning">
        This is a warning alert — check it out!
      </MaterialAlert>
      <MaterialAlert variant="filled" severity="info">
        This is an info alert — check it out!
      </MaterialAlert>
      <MaterialAlert variant="filled" severity="success">
        This is a success alert — check it out!
      </MaterialAlert>
    </Stack>
  );
}
