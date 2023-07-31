import { useRouter } from 'next/router';
import MutateProductPage from '@/components/pages/MutateProductPage';

export default () => {
  const router = useRouter();
  const { productId } = router.query;
  return <MutateProductPage productId={productId as string} />;
};
