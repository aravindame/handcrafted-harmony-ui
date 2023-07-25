import { useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import Head from 'next/head'
import ProductCards from '@/components/templates/ProductCards'
import { getAllProducts } from '@/store/product/product.slice'
import LoadingSpinner from '@/components/atoms/LoadingSpinner'
import { AppDispatch, RootState } from '@/store/store'
import { useDispatch, useSelector } from 'react-redux'

const HomePage: React.FC<any> = () => {
  const dispatch = useDispatch<AppDispatch>()
  const products = useSelector((state:RootState) => state.productSlice.products);
  const isLoading = useSelector((state:RootState) => state.productSlice.loading)

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>Handcrafted Harmony</title>
      </Head>
      <Container className='mt-5 mb-5'>
        {isLoading && <LoadingSpinner/>}
        
        <Row>
          <ProductCards products={products} />
        </Row>
      </Container>
    </>
  )
}

export default HomePage

