import Head from 'next/head';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Col, Container, Row, Table } from 'react-bootstrap';

import OrderSummary from '@/components/templates/OrderSummary';
import { getAnalytics, getOrders } from '@/store/analytic/analyticSlice';
import ProductItem from '@/components/molecules/ProductItem';
import notify from '@/config/toast.config';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';

const AnalyticsPage = () => {
  const { data: session } = useSession();

  const router = useRouter();

  const products = useSelector((state:RootState) => state.analyticSlice.analytics);
  const isLoading = useSelector((state:RootState) => state.analyticSlice.loading);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!session) {
      router.replace('/', undefined, { shallow: true });
      notify('Unauthorized!', 'warning');
    }
  }, [session, router]);

  useEffect(() => {
    dispatch(getAnalytics());
    dispatch(getOrders());
  }, [dispatch]);

  if (!products) {
    return null;
  }

  const popularProducts = [...products];
  popularProducts.sort((a, b) => b.totalQuantity - a.totalQuantity);
  const topThree = popularProducts.slice(0, 3);

  return (
    <>
      <Head>
        <title>Analytics & Orders</title>
      </Head>
      <Container className='mt-4'>
        {isLoading && <LoadingSpinner />}
        <h1>Analytics</h1>
        <Row>
          <Col md={{ span: 11, offset: 1 }}>
            <h3>Top Selling</h3>
            <Row>
              {topThree?.map((product) => (
                <ProductItem
                  key={product.id}
                  isEditable={false}
                  product={{
                    ...product,
                    category: `Rs ${product.price} x ${product.totalQuantity}`,
                    price: product.sumPrice ?? 0,
                  }}
                />
              ))}
            </Row>
          </Col>
        </Row>
        <Row className='mt-5'>
          <Col md={{ span: 5, offset: 1 }}>
            <h3>Sales Summary</h3>
            <Table striped bordered>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product Title</th>
                  <th>Sold Qty</th>
                  <th>Total Sales</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={product.id}>
                    <td>{++index}</td>
                    <td>{product.title}</td>
                    <td>{product.totalQuantity} x {product.price}</td>
                    <td>Rs {product.sumPrice?.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
          <Col md={{ span: 5, offset: 1 }}>
            <OrderSummary />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AnalyticsPage;
