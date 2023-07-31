export default interface ICart {
  id?: string;
  title: string;
  category?: string;
  imageUrl: string;
  price: number;
  description?: string;
  availableQuantity?: number;
  status?: boolean;
  quantity: number;
}
