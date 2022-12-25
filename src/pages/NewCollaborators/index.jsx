import React, { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Box } from '@mui/material';
import {
  Stepper,
  Step,
  StepLabel,
  Grid,
  FormHelperText,
  Button
} from '@mui/material';

import Header from '../../components/Header';
import Steep1 from './Steep1';
import Steep2 from './Steep2';
import Steep3 from './Steep3';

const steps = [' User Verification', 'User permissions', 'finish'];

const NewCollaborators = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const renderSteep = () => {
    switch (activeStep) {
      case 0:
        return <Steep1 handleBack={handleBack} handleNext={handleNext} />;
      case 1:
        return <Steep2 />;
      case 2:
        return <Steep3 />;
      default:
        return false;
    }
  };

  return (
    <Box
      sx={{
        maxWidth: '800px',
        padding: 7,
        bgcolor: 'background.default'
      }}
    >
      <Stepper activeStep={activeStep} orientation="horizontal">
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid container>{renderSteep(activeStep)}</Grid>
    </Box>
  );
};

export default NewCollaborators;
