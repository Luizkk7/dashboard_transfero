import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '12px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const card = (
  <React.Fragment>
    <CardContent>
      <Typography fontWeight={300} color="text.secondary">
        Update your account information
      </Typography>
      <Typography fontWeight={1100}>Account Information </Typography>
    </CardContent>
    <CardActions>
      <Button
        sx={{
          color: '#388e3c'
        }}
        onClick={handleSubmit}
      >
        {' '}
        Verify user
      </Button>
    </CardActions>
  </React.Fragment>
);

export default function OutlinedCard() {
  return (
    <Box sx={{ minWidth: 500 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}
