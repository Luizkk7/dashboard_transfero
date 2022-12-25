import { Grid, TextField, FormHelperText } from '@mui/material';

const AccountDetails = (props) => {
  const { formik } = props;
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          name="email"
          label="Email"
          variant="outlined"
          type="email"
          fullWidth
          size="small"
          error={Boolean(formik.touched.email && formik.errors.email)}
          onChange={formik.handleChange}
          value={formik.values.email}
        />
      </Grid>

      {formik.errors.submit && (
        <Grid item xs={12}>
          <FormHelperText error>{formik.errors.submit}</FormHelperText>
        </Grid>
      )}
    </Grid>
  );
};

export default AccountDetails;
