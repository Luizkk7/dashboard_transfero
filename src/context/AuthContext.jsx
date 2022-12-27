import { useEffect } from 'react';
import { createContext, useCallback, useState } from 'react';
import api from '@api/index';

const wrongCredentialsMessage = 'Wrong email or password';

const userKey = 'token';
const INITIAL_USER_STATE = JSON.parse(localStorage.getItem(userKey) || '{}');

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(INITIAL_USER_STATE);

  const isAuthenticated = useCallback((userData) => {
    const notExpired = userData.expiresIn
      ? Date.now() < new Date(userData.expiresIn).getTime()
      : true;

    return (
      !userData.bloqueado &&
      !userData.senhaExpirada &&
      !!userData.token &&
      !!userData.usuarioGuid &&
      !!notExpired
    );
  }, []);

  const isFirstAccess = useCallback((userData) => {
    return Boolean(userData?.primeiroAcesso);
  }, []);

  const setBearerToken = (token) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const login = async (email, senha) => {
    const body = {
      email,
      senha
    };

    const url = '/login';

    await api.put(url, body).then(({ data }) => {
      if (!isAuthenticated(data)) {
      }

      // ! 24 hours for login expiration
      data.expiresIn = new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString();

      setBearerToken(data.token);
      localStorage.setItem(userKey, JSON.stringify(data));
      setUser(data);
    });
  };

  const logout = () => {
    api.defaults.headers.common['Authorization'] = null;
    localStorage.setItem(userKey, '{}');
    setUser({});
  };

  useEffect(() => {
    if (!isAuthenticated(INITIAL_USER_STATE)) {
      logout();
      return;
    }
    setBearerToken(INITIAL_USER_STATE.token);
    setUser(INITIAL_USER_STATE);
  }, [INITIAL_USER_STATE]);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        isAuthenticated: isAuthenticated(user),
        isFirstAccess: isFirstAccess(user),
        user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
