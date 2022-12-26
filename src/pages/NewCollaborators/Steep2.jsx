import { Grid, TextField, Button } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '@api/index';
import regex from '../../utils/regex';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import toast from '../../functions/toast';
import React, { useEffect } from 'react';
import Tabpanel from '../../components/TabPanel';

const Steep2 = ({ handleNext = () => {}, handleBack = () => {} }) => {
  const form = useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = form.handleSubmit(async (data) => {
    setLoading(true);
    let tokenConvert = localStorage.getItem('token');
    let tokenParse = JSON.parse(tokenConvert);
    let token = tokenParse.token;

    api
      .post(
        `/user_permissions`,
        {
          user_id: '',
          paper_id: ''
        },
        {
          headers: {
            'content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then((resp) => {
        toast.success('Papers successfully saved');
        console.log(resp);
        if (resp !== null) {
          return handleNext();
        }
      })
      .catch((error) => {
        toast.error('unsaved papers');
        console.log(error);
      });
  });

  return (
    <Grid container>
      <Typography variant="h2"> Account Information </Typography>
      <Typography variant="h5"> Update your account information </Typography>
      <Tabpanel />

      <Grid item xs={12}>
        <Button
          sx={{
            color: '#388e3C'
          }}
          onClick={handleBack}
        >
          Back
        </Button>
        <Button
          sx={{
            color: '#388e3c'
          }}
          onSubmit={handleSubmit}
          onClick={handleSubmit}
        >
          Next
        </Button>
      </Grid>
    </Grid>
  );
};

export default Steep2;
