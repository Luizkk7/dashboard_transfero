import { Grid, TextField, Button } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { palette } from '@mui/system';
import api from '@api/index';
import regex from '../../utils/regex';
import Typography from '@mui/material/Typography';
import toast from '../../functions/toast';
const Steep1 = ({ handleNext = () => {}, handleBack = () => {} }) => {
  const form = useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = form.handleSubmit(async ({ email }) => {
    let tokenConvert = await localStorage.getItem('token');
    let tokenParse = JSON.parse(tokenConvert);
    let token = tokenParse.token;
    await api
      .get(`/users/email/${email}`, {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      .then((resp) => {
        toast.success('Successfully Authenticated User');
        if (resp !== null) {
          return handleNext();
        }
      })
      .catch((error) => {
        toast.error(error.response.data.msg);
      });
  });
  return (
    <Grid container>
      <Typography fontWeight={1100}>Account Information </Typography>
      <Typography fontWeight={300} color="text.secondary">
        Update your account information
      </Typography>

      <Grid item xs={12} sx={{ padding: '20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="email"
              label="Email"
              variant="outlined"
              type="email"
              fullWidth
              size="small"
              error={Boolean(form.formState.errors.email)}
              helperText={form.formState.errors.email?.message || ' '}
              {...form.register('email', {
                required: 'Email requirido',
                pattern: {
                  value: regex.EMAIL_REGEX,
                  message: 'Formato de email inválido'
                },
                minLength: {
                  value: 3,
                  message: 'O email deve ter no mínimo 3 caracteres'
                },
                maxLength: {
                  value: 320,
                  message: 'O email deve ter no máximo 320 caracteres'
                }
              })}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid bgcolor="primary.light" container my={1} item xs={2}>
        <Button
          sx={{
            color: '#388e3c'
          }}
          onClick={handleSubmit}
        >
          {' '}
          Verify user
        </Button>
      </Grid>
    </Grid>
  );
};

export default Steep1;
