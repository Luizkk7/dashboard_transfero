import { toast as toastLib } from 'react-toastify';

const config = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'dark'
};

const toast = {
  success: (message) => {
    toastLib.success(message, config);
  },
  error: (message) => {
    toastLib.error(message, config);
  },
  warn: (message) => {
    toastLib.warn(message, config);
  },
  info: (message) => {
    toastLib.info(message, config);
  }
};

export default toast;
