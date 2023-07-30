import IProduct from '@/types/product.interface';
import ProductItem from '../molecules/product-item'; 

/**
 * A component that displays a list of products as product cards.
 * @param {ProductCardProps} props - The props for the ProductCard component.
 * @returns {JSX.Element} The ProductCard component displaying the product cards.
 */

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
