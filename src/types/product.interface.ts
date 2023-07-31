export default interface IProduct {
  id?: string;
  title: string;
  description: string;
  availableQuantity: number;
  createdAt?: string;
  isDeleted?: boolean;
  category: string;
  updatedAt?: string;
  imageUrl: string;
  price: number;
}
