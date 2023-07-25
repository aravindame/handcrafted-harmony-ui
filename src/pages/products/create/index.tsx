import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Head from 'next/head';

import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import IProduct from '@/types/product.interface';
import { addNewProduct } from '@/store/product/product.slice';
import ManageProduct from '@/components/templates/ManageProduct';
import notify from '@/config/toast.config';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';

const NewProduct = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector((state:RootState) => state.productSlice.loading);
  const error = useSelector((state:RootState) => state.productSlice.error);

  useEffect(() => {
    if (session) {
      router.replace('/', undefined, { shallow: true });
      notify('Unauthorized!', 'warning');
    }
  }, [session, router]);

  useEffect(() => {
    if (error) {
      notify(`Failed! - ${error}`, 'error');
    }
  }, [error, router]);

  const addProduct = async (product: IProduct) => {
    try {
      const response = await dispatch(addNewProduct(product));
      if (response.payload) {
        notify('Product added successfully!');
        router.replace('/', undefined, { shallow: true });
      }
    } catch (error) {
      notify('Failed to add product!', 'error');
    }
  };

  return (
    <>
      <Head>
        <title>Add new product</title>
      </Head>
      <main>
        {isLoading && <LoadingSpinner />}
        {!session && <ManageProduct onSubmit={addProduct} />}
      </main>
    </>
  );
};

export default NewProduct;
