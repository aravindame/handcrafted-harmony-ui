import { Badge } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import Link from 'next/link';
import Button from '@/components/atoms/button';
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store';

/**
 * A shopping cart icon component with the quantity badge displayed using React Bootstrap Badge.
 * @returns {JSX.Element} The Cart component displaying the shopping cart icon and the quantity badge.
 */

const Cart: React.FC = () => {
  const quantity = useSelector((state: RootState) => state.orderSlice.quantity);

  return (
    <div className="col-1">
      <Link href="/order">
        <Button className="pull-right" disabled={quantity <= 0} variant='light'>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FaShoppingCart style={{ fontSize: '24px', marginRight: '5px' }} />
            <Badge bg="light" style={{ fontSize: '16px', color: 'black' }}>{quantity}</Badge>
          </div>
        </Button>
      </Link>
    </div>
  );
}

export default Cart;
