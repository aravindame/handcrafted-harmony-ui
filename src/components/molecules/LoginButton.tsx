import { useSession, signIn, signOut } from 'next-auth/react';
import Button from '../atoms/Button';
import { Col, Row } from 'react-bootstrap';

/**
 * A login button component that handles authentication status using NextAuth's useSession hook.
 * @returns {JSX.Element} The LoginButton component displaying a "Sign in" or "Sign out" button based on the authentication status.
 */

const LoginButton = () => {
  const { status } = useSession();

  return (
    <Row className='mt-5 mb-5'>
      <Col>
        {status === 'authenticated' ? (
          <>
            <Button variant='light' className='' onClick={() => signOut()}>
              Sign out
            </Button>
          </>
        ) : (
          <>
            <Button variant='light' className='ml-2' onClick={() => signIn()}>
              Sign in
            </Button>
          </>
        )}
      </Col>
    </Row>
  );
};

export default LoginButton;
