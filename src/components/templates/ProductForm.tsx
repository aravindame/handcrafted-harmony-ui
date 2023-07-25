import { useEffect, useState } from 'react';
import { Form, Row, Container, Col } from 'react-bootstrap';

import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';
import IProduct from '@/types/product.interface';
import { validateProduct } from '@/util/form.validator';

interface IProductFormProps {
  onSubmit: (product: IProduct) => void;
  product?: IProduct | null;
}

const productCategory = [
  { label: 'Home Decor', value: 'Home Decor' },
  { label: 'Jewelry', value: 'Jewelry' },
  { label: 'Toys and Games', value: 'Toys and Games' },
  { label: 'Paintings and Artwork', value: 'Paintings and Artwork' },
  { label: 'Photography', value: 'Photography' },
  { label: 'Accessories', value: 'Accessories' },
  { label: 'Pottery', value: 'Pottery' },
  { label: 'Sculptures', value: 'Sculptures' },
  { label: 'Books and Stationery', value: 'Books and Stationery' },
  { label: 'Food and Beverages', value: 'Food and Beverages' },
];


const ProductForm: React.FC<IProductFormProps> = ({ onSubmit, product }: IProductFormProps) => {
  const [validationResult, setValidationResult] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [title, setTitle] = useState(product?.title ?? '');
  const [description, setDescription] = useState(product?.description ?? '');
  const [category, setCategory] = useState(product?.category ?? 'Fashion');
  const [price, setPrice] = useState(product?.price ?? 0);
  const [imageUrl, setImageUrl] = useState(product?.imageUrl ?? '');
  const [availableQuantity, setAvailableQuantity] = useState(product?.availableQuantity ?? 0);

  useEffect(() => {
    const errors = validateProduct({
      title,
      description,
      category,
      price,
      imageUrl,
      availableQuantity,
    });

    isSubmitted && setValidationResult(errors);
  }, [title, description, category, price, imageUrl, availableQuantity, isSubmitted]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentDate = new Date().toISOString();

    const newProduct: IProduct = {
      title,
      description,
      category,
      price,
      imageUrl,
      availableQuantity,
      createdAt: currentDate,
      updatedAt: currentDate,
      isDeleted: false
    };

    const errors = validateProduct(newProduct);

    if (errors.length === 0) {
      onSubmit(newProduct);
    } else {
      setValidationResult(errors);
    }

    setIsSubmitted(true);
  };

  const isFormValid = (inputName: string): boolean =>
    !!validationResult.find((result) => result === inputName);

  return (
    <Form noValidate validated={false} className="mt-5" onSubmit={handleSubmit}>
      <Container >
        <Row className="mb-3">
          <Col md={{ span: 4, offset: 4 }}>
            <Input
              type='text'
              label='Title'
              placeholder='Enter Title'
              value={title}
              onChange={(value) => setTitle(value)}
              isInvalid={isFormValid('title')}
            />
            <Input
              type='text'
              label='Description'
              placeholder='Enter Description'
              value={description}
              onChange={(value) => setDescription(value)}
              isInvalid={isFormValid('description')}
            />
            <Input
              type='number'
              label='Price'
              placeholder='Enter price'
              value={price.toString()}
              onChange={(value) => setPrice(parseFloat(value))}
              isInvalid={isFormValid('price')}
            />
            <Input
              type='number'
              label='Available quantity'
              placeholder='Enter available quantity'
              value={availableQuantity.toString()}
              onChange={(value) => setAvailableQuantity(parseFloat(value))}
              isInvalid={isFormValid('availableQuantity')}
            />
            <Select
              label='Category'
              onChange={(value) => setCategory(value)}
              options={productCategory}
              value={category}
            />
            <Input
              type='url'
              label='Product Image url'
              placeholder='Enter image URL'
              value={imageUrl}
              onChange={(value) => setImageUrl(value)}
              isInvalid={isFormValid('imageUrl')}
            />
            <Button variant="primary" type="submit">
              {product ? 'Update' : 'Submit'}
            </Button>
          </Col>
        </Row>
      </Container>
    </Form>
  );
};

export default ProductForm;
