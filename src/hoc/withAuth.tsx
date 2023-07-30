import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import notify from '@/config/toast.config';
import Spinner from '@/components/atoms/spinner';

type WithAuthProps = {
  productId?:string;
};

/**
 * Higher-Order Component (HOC) for handling authentication in Next.js applications.
 * @param WrappedComponent - The component to be wrapped with the authentication logic.
 * @returns The wrapped component with authentication logic.
 */
const withAuth = <P extends WithAuthProps>(WrappedComponent: React.FC<P>) => {
  return (props: P) => {
    const { data: session } = useSession();
    const router = useRouter();
    useEffect(() => {
      if (!session) {
        router.replace('/', undefined, { shallow: true });
        notify('Unauthorized!', 'warning');
      }
    }, [session, router]);
    if (!session) {
      return <Spinner />;
    }
    return <WrappedComponent {...props}/>;
  };
};

export default withAuth;
