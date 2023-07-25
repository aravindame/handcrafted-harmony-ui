import { ToastOptions, toast } from "react-toastify";

// Enum for theme options
enum ToastTheme {
  Light = "light",
  Dark = "dark",
}

// Constants for status
const ToastStatus = {
  Success: "success",
  Warning: "warning",
  Error: "error",
};

// Default options for toast messages
const defaultOptions: ToastOptions = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: 0,
  theme: ToastTheme.Light,
};

// Function to display toast notification
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
