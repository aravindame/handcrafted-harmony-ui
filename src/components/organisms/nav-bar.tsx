import Link from 'next/link';
import { Navbar, Container, Row, Col } from 'react-bootstrap';
import Button from '@/components/atoms/button';
import { useSession } from 'next-auth/react';
import LoginButton from '../molecules/login-button';
import Cart from '../molecules/cart';

/**
 * A reusable component that represents the navigation bar of the application.
 * It displays the brand logo, navigation links, and user-related buttons like login and cart.
 * @returns {JSX.Element} The NavbarComponent displaying the navigation bar.
 */

const NavbarComponent = () => {
  const { status } = useSession();

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Link href="/">
          <Navbar.Brand>Handcrafted Harmony</Navbar.Brand>
        </Link>
        {(status === "authenticated") && (
          <Row>
            <Col className="mb-1">
              <Link href="/products/create">
                <Button variant="light">Add new Product</Button>
              </Link>
              <Link href="/analytics" className="ml-1">
                <Button variant="light">Analytics & Orders</Button>
              </Link>
            </Col>
          </Row>
        )}
          <Cart />
          <LoginButton />
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
