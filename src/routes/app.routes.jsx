import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import AppComponent from '../pages/App/AppComponent';
import Team from '../pages/Team';
import AuthenticatedRoutes from './private.routes';
import NewCollaborators from '../pages/NewCollaborators';
import ResetPassword from '../pages/ResetLogin/ResetPassword';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <AuthenticatedRoutes>
        <Routes>
          <Route path="/" element={<AppComponent />}>
            {/* <Route path="/InternalControl" element={<Team />} /> */}
            <Route path="/system-manage" element={<Team />} />
            <Route path="/new-collaborators" element={<NewCollaborators />} />
            <Route path="/reset-login" element={<ResetPassword />} />
          </Route>
        </Routes>
      </AuthenticatedRoutes>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}
