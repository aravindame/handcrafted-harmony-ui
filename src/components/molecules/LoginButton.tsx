import { useSession, signIn, signOut } from 'next-auth/react';
import { Button } from 'react-bootstrap';

/**
 * A login button component that handles authentication status using NextAuth's useSession hook.
 * @returns {JSX.Element} The LoginButton component displaying a "Sign in" or "Sign out" button based on the authentication status.
 */

const LoginButton = () => {
  const { status } = useSession();

  return (
    <>
      {status === 'authenticated' ? (
        <Button variant='light' onClick={() => signOut()} className='me-2'>
          Sign out
        </Button>
      ) : (
        <Button variant='light' onClick={() => signIn()} className='me-2'>
          Sign in
        </Button>
      )}
    </>
  );
};

export default LoginButton;
