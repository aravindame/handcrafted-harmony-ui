import { Row, Container, Col } from 'react-bootstrap';
import IProduct from '@/types/product.interface';
import ProductForm from '@/components/templates/product-form';

/**
 * A component for managing product data.
 * @param {IManageProductProps} props - The component props.
 * @returns {JSX.Element} The ManageProduct component.
 */

interface IManageProductProps {
  onSubmit: (product: IProduct) => void;
  product?: IProduct | null;
}

const ManageProduct = ({ onSubmit, product }: IManageProductProps) => {
  return (
    <Container className='mt-5 mb-5'>
      <Row>
        <Col>
          <h3>
            {product ? `Update product: ${product?.title}` : 'Add new product'}
          </h3>
        </Col>
      </Row>
      <ProductForm onSubmit={onSubmit} product={product || null} />
    </Container>
  );
};

export default ManageProduct;
