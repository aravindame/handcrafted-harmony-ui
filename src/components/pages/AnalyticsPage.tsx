import Head from 'next/head';
import { useEffect } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';

import OrderSummary from '@/components/organisms/OrderSummary';
import { getAnalytics, getOrders } from '@/store/analytics/analytics.slice';
import ProductItem from '@/components/molecules/ProductItem';
import Spinner from '@/components/atoms/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import withAuth from '@/hoc/withAuth';

/**
 * AnalyticsPage component displays analytics and sales summary data for the user.
 *
 * @component
 */

const AnalyticsPage = () => {
  const products = useSelector(
    (state: RootState) => state.analyticSlice.analytics
  );
  const isLoading = useSelector(
    (state: RootState) => state.analyticSlice.loading
  );
  const dispatch = useDispatch<AppDispatch>();

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
        {isLoading && <Spinner />}
        <h1>Analytics</h1>
        <Row>
          <Col md={{ span: 11, offset: 1 }}>
            <h3>Top Selling Products</h3>
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
                    <td>
                      {product.totalQuantity} x {product.price}
                    </td>
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

export default withAuth(AnalyticsPage);
