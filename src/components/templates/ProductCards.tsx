import IProduct from '@/types/product.interface';
import ProductItem from '../molecules/ProductItem'; 

interface ProductCardProps {
  products: IProduct[];
}

const ProductCard = ({ products }: ProductCardProps) => {
  return (
    <>
      {products.map((product) => (
        <ProductItem key={product.id} product={product} /> 
      ))}
    </>
  );
}

export default ProductCard;
