import { ToastOptions, toast } from 'react-toastify';

// Enum for theme options
enum ToastTheme {
  Light = 'light',
  Dark = 'dark',
}

// Constants for status
const ToastStatus = {
  Success: 'success',
  Warning: 'warning',
  Error: 'error',
};

// Default options for toast messages
const defaultOptions: ToastOptions = {
  position: 'top-center',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: 0,
  theme: ToastTheme.Light,
};

/**
 * notify Function
 *
 * Function to display toast notifications using react-toastify.
 *
 * @param {string} message - The message to display in the toast notification.
 * @param {string} status - The status of the toast notification. Default is 'success'.
 */
const notify = (message: string, status: string = ToastStatus.Success) => {
  switch (status) {
    case ToastStatus.Success:
      toast.success(message, defaultOptions);
      break;
    case ToastStatus.Warning:
      toast.warning(message, defaultOptions);
      break;
    case ToastStatus.Error:
      toast.error(message, defaultOptions);
      break;
    default:
      toast(message, defaultOptions);
      break;
  }
};

export default notify;
