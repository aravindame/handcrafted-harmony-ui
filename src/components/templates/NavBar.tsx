import Link from 'next/link';
import { Navbar, Container, Row, Col } from 'react-bootstrap';
import Cart from '@/components/molecules/Cart';
import Button from '@/components/atoms/Button';
import { useSession } from 'next-auth/react';
import LoginButton from '../molecules/LoginButton';

const NavbarComponent = () => {
  const { data: session } = useSession();

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Link href="/">
          <Navbar.Brand>Handcrafted Harmony</Navbar.Brand>
        </Link>
        {!session && (
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
