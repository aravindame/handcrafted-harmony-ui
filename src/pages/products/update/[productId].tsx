import { useRouter } from 'next/router';
import MutateProductPage from '@/components/pages/MutateProductPage';

const UpdateProductPage = () => {
  const router = useRouter();
  const { productId } = router.query;
  return <MutateProductPage productId={productId as string} />;
};

export default UpdateProductPage;
