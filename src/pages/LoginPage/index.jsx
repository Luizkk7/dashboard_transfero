import React, { useContext, useEffect } from 'react';
import './styles.css';
import img1 from './components/img/Transferobranco.png';
import toast from '../../functions/toast';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { CircularProgress } from '@mui/material';
// import Waves from '@components/Waves';

const LoginPage = () => {
  const { isAuthenticated, login } = useContext(AuthContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.email === '' || form.password === '') {
      return;
    }

    setLoading(true);

    await login(form.email, form.password)
      .then(() => {
        toast.success('Successfully Authenticated User');
        navigate('/system-manage');
      })
      .catch((error) => {
        // toast.error('error.response.data.responseText');
        console.log(error);
      });

    setLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, []);

  return (
    <div id="login">
      <div className="container">
        <div className="login-box fadeInDown">
          <div className="logoLogin">
            <img src={img1} id="logo" width="200px" height="40px" />
          </div>
          <h4 className="fadeIn first"> Use your credentials to access</h4>

          <form action="" onSubmit={handleSubmit}>
            <div className="user-box fadeIn second">
              <input
                type="text"
                name=""
                required=""
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <label htmlFor="">Email</label>
            </div>
            <div className="user-box fadeIn third">
              <input
                type="password"
                name=""
                required=""
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <label htmlFor="">Password</label>
            </div>
            {loading ? (
              <div className="loading">
                <CircularProgress size={26} />
              </div>
            ) : (
              <button className="fadeIn fourth" type="submit">
                Login
              </button>
            )}
          </form>
        </div>
        {/* <Waves /> */}
      </div>
    </div>
  );
};

export default LoginPage;
