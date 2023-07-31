import { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import Head from 'next/head';
import ProductCards from '@/components/organisms/ProductCards';
import { getAllProducts } from '@/store/product/product.slice';
import Spinner from '@/components/atoms/Spinner';
import { AppDispatch, RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';

/**
 * A page component that lists all the products.
 * @returns {JSX.Element} The ListProductsPage component displaying the product list.
 */

const ListProductsPage: React.FC<any> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(
    (state: RootState) => state.productSlice.products
  );
  const isLoading = useSelector(
    (state: RootState) => state.productSlice.loading
  );

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>Handcrafted Harmony</title>
      </Head>
      <Container className='mt-5 mb-5'>
        {isLoading && <Spinner />}

        <Row>
          <ProductCards products={products} />
        </Row>
      </Container>
    </>
  );
};

export default ListProductsPage;
