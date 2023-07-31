import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import notify from '@/config/toast.config';
import Spinner from '@/components/atoms/Spinner';

type WithAuthProps = {
  productId?: string;
};

/**
 * Higher-Order Component (HOC) for handling authentication in Next.js applications.
 * @param WrappedComponent - The component to be wrapped with the authentication logic.
 * @returns The wrapped component with authentication logic.
 */
const withAuth = <P extends WithAuthProps>(WrappedComponent: React.FC<P>) => {
  const WithAuthComponent: React.FC<P> = (props: P) => {
    const { data: session } = useSession();
    const router = useRouter();
    useEffect(() => {
      if (!session) {
        router.replace('/', undefined, { shallow: true });
      }
    }, [session, router]);
    if (!session) {
      return <Spinner />;
    }
    return <WrappedComponent {...props} />;
  };

  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithAuthComponent.displayName = `withAuth(${displayName})`;

  return WithAuthComponent;
};

export default withAuth;
