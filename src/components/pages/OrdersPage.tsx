import Head from 'next/head';
import { Container } from 'react-bootstrap';
import OrderForm from '@/components/templates/OrderForm';

/**
 * A page component for the OrdersPage.
 * @returns {JSX.Element} The OrdersPage component.
 */

const OrdersPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Order Product</title>
      </Head>
      <Container className='mt-5 mb-5'>
        <OrderForm />
      </Container>
    </>
  );
};

export default OrdersPage;
