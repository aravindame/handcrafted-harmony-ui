import { Navbar, Nav, Container } from 'react-bootstrap';
import Link from 'next/link';
import Button from '../atoms/Button';
import Cart from '../molecules/Cart';
import LoginButton from '../molecules/LoginButton';
import { useSession } from 'next-auth/react';

/**
 * A reusable component that represents the navigation bar of the application.
 * It displays the brand logo, navigation links, and user-related buttons like login and cart.
 * @returns {JSX.Element} The NavbarComponent displaying the navigation bar.
 */

const NavBar = () => {
  const { status } = useSession();
  return (
    <Navbar bg='dark' variant='dark' expand='lg'>
      <Container>
        <Navbar.Brand href='/'>Handcrafted Harmony</Navbar.Brand>
        <Navbar.Toggle aria-controls='navbar-nav' />
        <Navbar.Collapse id='navbar-nav'>
          {status === 'authenticated' && (
            <Nav className='me-auto'>
              <Link href='/products/create'>
                <Button variant='light'>Add new Product</Button>
              </Link>
              <Link href='/analytics' className='ms-2'>
                <Button variant='light'>Analytics & Orders</Button>
              </Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
      <div className='d-flex gap-3'>
        <div className='cart-panel'>
          <Cart />
        </div>
        <div className='cart-panel'>
          <LoginButton />
        </div>
      </div>
    </Navbar>
  );
};

export default NavBar;
