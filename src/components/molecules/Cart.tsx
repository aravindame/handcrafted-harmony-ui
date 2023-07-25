import { Badge } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import Link from 'next/link';
import Button from '@/components/atoms/Button';
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store';

const Cart: React.FC = () => {
  const totalOrder = useSelector((state: RootState) => state.orderSlice.totalOrder);

  return (
    <div className="col-1">
      <Link href="/order">
        <Button className="pull-right" disabled={totalOrder <= 0} variant='light'>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FaShoppingCart style={{ fontSize: '24px', marginRight: '5px' }} />
            <Badge bg="light" style={{ fontSize: '16px', color: 'black' }}>{totalOrder}</Badge>
          </div>
        </Button>
      </Link>
    </div>
  );
}

export default Cart;
