import { useRouter } from 'next/router';
import Head from 'next/head';
import Spinner from '@/components/atoms/Spinner';
import IProduct from '@/types/product.interface';
import { addNewProduct, updateProduct } from '@/store/product/product.slice';
import ManageProduct from '@/components/templates/ManageProduct';
import notify from '@/config/toast.config';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import withAuth from '@/hoc/withAuth';
import useErrorNotifyHandler from '@/hooks/useErrorNotifyHandler';

/**
 * A page component for creating or updating a product.
 * @param {CreateProductPageProps} props - The component props.
 * @returns {JSX.Element} The MutateProductPage component for creating or updating a product.
 */

interface CreateProductPageProps {
  productId?: string;
}

const MutateProductPage: React.FC<CreateProductPageProps> = ({ productId }) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(
    (state: RootState) => state.productSlice.loading
  );
  const error = useSelector((state: RootState) => state.productSlice.error);

  useErrorNotifyHandler(error);

  const handleProductMutation = async (product: IProduct) => {
    const mutation = productId ? 'update' : 'create';
    try {
      const response =
        mutation === 'create'
          ? await dispatch(addNewProduct(product))
          : await dispatch(updateProduct({ id: productId ?? '', product }));
      if (response.payload) {
        notify(`Product ${mutation}d successfully!`);
        router.replace('/', undefined, { shallow: true });
      }
    } catch (error) {
      notify(`Failed to ${mutation} product!', 'error'`);
    }
  };

  return (
    <>
      <Head>
        <title>Add new product</title>
      </Head>
      <main>
        {isLoading ? (
          <Spinner />
        ) : (
          <ManageProduct onSubmit={handleProductMutation} />
        )}
      </main>
    </>
  );
};

export default withAuth(MutateProductPage);
