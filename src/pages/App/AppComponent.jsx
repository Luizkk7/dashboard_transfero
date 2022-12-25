import { ColorModeContext, useMode } from '../../theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Topbar from '../../pages/global/Topbar';
import Sidebar from '../../pages/global/Sidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';

function AppComponent() {
  const [theme, colorMode] = useMode();

  const navigate = useNavigate();

  const { isFirstAccess } = useContext(AuthContext);

  useEffect(() => {
    if (isFirstAccess) {
      navigate('/ResetLogin');
    }
  }, [isFirstAccess, window?.location?.pathname]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />

            <Outlet />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default AppComponent;
