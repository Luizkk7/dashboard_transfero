import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Grid,
  FormHelperText,
  Button
} from '@mui/material';
import PersonalInfo from './Components/PersonalInfo';
import AccountDetails from './Components/AccountDetails';
import ReviewInfo from './Components/ReviewInfo';

const steps = [' User Verification', 'User permissions', 'finish'];

const Form = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required('Email is required').email('Invalid email')
    })
  });

  const formContent = (step) => {
    switch (step) {
      case 0:
        return <AccountDetails formik={formik} />;
      case 1:
        return <PersonalInfo formik={formik} />;
      case 2:
        return <ReviewInfo formik={formik} />;
      default:
        return <div>404: Not Found</div>;
    }
  };

  return (
    <Box
      sx={{
        maxWidth: '600px',
        padding: 7
      }}
    >
      <Stepper activeStep={activeStep} orientation="horizontal">
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid container>
        <Grid item xs={12} sx={{ padding: '20px' }}>
          {formContent(activeStep)}
        </Grid>
        {formik.errors.submit && (
          <Grid item xs={12}>
            <FormHelperText error>{formik.errors.submit}</FormHelperText>
          </Grid>
        )}
        <Grid item xs={12}>
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Back
          </Button>
          {activeStep === steps.length - 1 ? (
            <Button>Submit</Button>
          ) : (
            <Button onClick={formik.handleSubmit}>Next</Button>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Form;
