import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Badge, Card, Col } from 'react-bootstrap';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import IProduct from '@/types/product.interface';
import Button from '@/components/atoms/button';
import { addToCart } from '@/store/order/order.slice';
import { removeProduct } from '@/store/product/product.slice';
import notify from '@/config/toast.config';
import { AppDispatch, RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import useErrorNotifyHandler from '@/hooks/useErrorNotifyHandler';
import Modal from './modal';

/**
 * A reusable component that displays a card for a product item with various actions like adding to cart, updating, and deleting.
 * @param {Props} props - The properties to configure the ProductItem component.
 * @returns {JSX.Element} The ProductItem component displaying the card for the product.
 */

interface Props {
  product: IProduct | any;
  isEditable?: boolean;
}

const ProductItem: React.FC<Props> = ({ product, isEditable = true }) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { status } = useSession();
  const error = useSelector((state:RootState) => state.productSlice.error);
  const cart = useSelector((state:RootState) => state.orderSlice.cart);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [countOnCart, setCountOnCart] = useState<number>(0);

  useErrorNotifyHandler(error);

  useEffect(() => {
    const cartData = cart.find((item:any) => item.productId === product.id);

    setCountOnCart(cartData?.quantity ?? 0);
  }, [cart, product?.id]);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  const handleDelete = () => {
    setIsModalVisible(true);
  };

  const onDeleteConfirm = () => {
    product?.id &&
      dispatch(removeProduct(product.id)).then(response => {
        if (response.payload) {
          notify('Delete successful!');
          router.replace('/', undefined, { shallow: true });
        }
      });
    setIsModalVisible(false);
  };

  const onDeleteCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Modal
        isModalVisible={isModalVisible}
        onConfirm={onDeleteConfirm}
        onCancel={onDeleteCancel}
        variant="danger"
        title = "Confirm Delete"
        message = "Are you sure you want to delete this product?" 
        confirmBtnText = "Delete"
      />
      < Col md={3} className="mt-3">
        <Card>
          <Card.Img height={200} className="object-fit-cover" variant="top" src={product?.imageUrl} />
          <Card.Body>
            <Card.Subtitle>{product?.category}</Card.Subtitle>
            <Card.Title>{product?.title}</Card.Title>
            <Card.Text>Rs {product?.price.toFixed(2)}</Card.Text>
            {isEditable && product?.availableQuantity && product?.availableQuantity > 0 && countOnCart < product?.availableQuantity ? (
              <Button variant="secondary" onClick={handleAddToCart}>
                Add to Cart
              </Button>
            ) : (
              <Badge bg="secondary">Out of stock</Badge>
            )}
          </Card.Body>
          {(status === "authenticated") && isEditable && (
            <Card.Footer>
              <Link href={`/products/update/${product.id}`}>
                <Button variant="primary" className="me-2">
                  Update
                </Button>
              </Link>
              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            </Card.Footer>
          )}
        </Card>
      </Col>
    </>
  );
};

export default ProductItem;
