import { useEffect, useState } from 'react';
import { Container, Form, Card, Row, Col } from 'react-bootstrap';
import { useRouter } from 'next/router';

import Button from '@/components/atoms/Button';
import Input from '../atoms/Input';
import { validateOrder } from '@/util/form.validator';
import { placeOrder, removeItemFromCart } from '@/store/order/order.slice';
import ICustomer from '@/types/customer.interface';
import notify from '@/config/toast.config';
import { AppDispatch, RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import useErrorNotifyHandler from '@/hooks/useErrorNotifyHandler';

/**
 * OrderForm Component
 *
 * Renders the order form to place an order and provide customer information.
 * Displays cart items and the total order amount.
 * Handles form validation and submission of the order.
 *
 * @returns {JSX.Element} JSX Element representing the OrderForm.
 */

const OrderForm = () => {
  const [validationResult, setValidationResult] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.orderSlice.cart);
  const total = useSelector((state: RootState) => state.orderSlice.totalOrder);
  const error = useSelector((state: RootState) => state.productSlice.error);

  const [formData, setFormData] = useState<ICustomer>({
    customerName: '',
    address: '',
    contact: '',
  });

  useEffect(() => {
    const validateAndSetErrors = async () => {
      const errors = await validateOrder(formData);
      isSubmitted && setValidationResult(errors);
    };

    validateAndSetErrors();
  }, [formData, isSubmitted]);

  const handleChange = (customerName: string, value: string) => {
    setFormData({ ...formData, [customerName]: value });
  };

  useErrorNotifyHandler(error);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
    const errors = await validateOrder(formData);
    if (errors.length === 0) {
      dispatch(placeOrder(formData)).then((response) => {
        if (response.payload) {
          notify('Order placed successful!');
          router.replace('/', undefined, { shallow: true });
        }
      });
    }
  };

  const isFormValid = (inputName: string): boolean =>
    !!validationResult.find((result) => result === inputName);

  return (
    <Container>
      <Row>
        <h2 className='mb-5'>Place your order</h2>
        <Col md={{ span: 5, offset: 1 }}>
          <h4>Cart Items</h4>
          {cart.map((item) => (
            <Card key={item.productId} className='mt-2'>
              <Row>
                <Col md={3}>
                  <Card.Img src={item.imageUrl} alt={item.title} />
                </Col>
                <Col md={9}>
                  <Card.Body className='text-left'>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>
                      Price: {item.quantity} x {item.price}
                    </Card.Text>
                    {/* Close button */}
                    <Button
                      variant='danger'
                      onClick={() =>
                        dispatch(removeItemFromCart(item.productId))
                      }
                    >
                      Remove Item
                    </Button>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          ))}

          <p className='mt-3'>Total order: Rs {total.toFixed(2)}</p>
        </Col>
        <Col md={{ span: 5, offset: 1 }}>
          <h4>Customer Information</h4>
          <Form onSubmit={handleSubmit}>
            <Input
              type='text'
              label='Full Name'
              placeholder='Enter full name'
              value={formData.customerName}
              onChange={(value) => handleChange('customerName', value)}
              isInvalid={isFormValid('customerName')}
            />
            <Input
              type='text'
              label='Address'
              placeholder='Enter address'
              value={formData.address}
              onChange={(value) => handleChange('address', value)}
              isInvalid={isFormValid('address')}
            />
            <Input
              type='text'
              label='Contact number'
              placeholder='Enter contact number'
              value={formData.contact}
              onChange={(value) => handleChange('contact', value)}
              isInvalid={isFormValid('contact')}
            />
            <Button
              className='mt-2'
              variant='primary'
              type='submit'
              disabled={cart.length <= 0}
            >
              Place Order
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderForm;
