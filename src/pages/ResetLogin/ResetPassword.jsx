import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import './styles.css';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function ResetPassword() {
  const { isFirstAccess } = useContext(AuthContext);

  const navigate = useNavigate();

  // form validation rules
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match')
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data) {
    // display form data on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(data, null, 4));
    return false;
  }

  useEffect(() => {
    if (!isFirstAccess) {
      navigate('/');
    }
  }, [isFirstAccess, window?.location?.pathname]);

  return (
    <div className="login-box fadeInDown">
      <h2 className="fadeIn first">Reset Password 🔒</h2>
      <subtitle>
        Your new password must be different from previously used passwords
      </subtitle>
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-row">
            <div className="user-box fadeIn third ">
              <input
                name="password"
                type="password"
                label="Password"
                {...register('password')}
                className={`form-control ${
                  errors.password ? 'is-invalid' : ''
                }`}
              />
              <div className="invalid-feedback">{errors.password?.message}</div>
            </div>
            <div className="user-box fadeIn third">
              <input
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                {...register('confirmPassword')}
                className={`form-control ${
                  errors.confirmPassword ? 'is-invalid' : ''
                }`}
              />
              <div className="invalid-feedback">
                {errors.confirmPassword?.message}
              </div>
            </div>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary mr-1">
              Register
            </button>
            <button
              type="button"
              onClick={() => reset()}
              className="btn btn-secondary"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;