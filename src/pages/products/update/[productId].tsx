import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { getProductById, updateProduct } from '@/store/product/product.slice';
import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import IProduct from '@/types/product.interface';
import ManageProduct from '@/components/templates/ManageProduct';
import notify from '@/config/toast.config';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';

const UpdateProduct = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();

  const { productId } = router.query;
  const id = productId as string;

  const product = useSelector((state:RootState) => state.productSlice.selectedProduct);
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
  }, [error]);

  useEffect(() => {
    if (!id) return;

    const getProduct = async (id: string) => {
      try {
        await dispatch(getProductById(id));
      } catch (error) {
        notify('Failed to fetch product!', 'error');
      }
    };

    getProduct(id);
  }, [id, dispatch]);

  const update = async (product: IProduct) => {
    try {
      const response = await dispatch(updateProduct({ id, product }));
      if (response.payload) {
        notify('Update successful!');
        router.replace('/', undefined, { shallow: true });
      }
    } catch (error) {
      notify('Update failed!', 'error');
    }
  };

  if (isLoading) {
    return (
      <>
        <Head>
          <title>Update product</title>
        </Head>
        <main>
          <LoadingSpinner />
        </main>
      </>
    );
  }

  if (!product) {
    return <>Product not found</>;
  }

  return (
    <>
      <Head>
        <title>Update product</title>
      </Head>
      <main>
        <ManageProduct product={product} onSubmit={update} />
      </main>
    </>
  );
};

export default UpdateProduct;
