import { useEffect } from 'react';
import notify from '@/config/toast.config';
import { useRouter } from 'next/router';

/**
 * Custom hook for handling error notifications.
 * It displays an error notification whenever the `error` state is updated.
 *
 * @param {string | null} error - The error message to be displayed.
 * @param {boolean} shallowReplace - Flag to indicate whether to replace the route using `router.replace`.
 */
const useErrorNotifyHandler = (error: any, shallowReplace = true) => {
  const router = useRouter();

  useEffect(() => {
    if (error) {
      notify(`Failed! - ${error?.message ?? error}`, 'error');
      if (shallowReplace) {
        router.replace('/', undefined, { shallow: true });
      }
    }
  }, [error, router, shallowReplace]);
};

export default useErrorNotifyHandler;
