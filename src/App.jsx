import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from './context/AuthContext';
import AppRoutes from './routes/app.routes';

function App() {
  return (
    <>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
