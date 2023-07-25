import ICustomer from "@/types/customer.interface";
import IProduct from "@/types/product.interface";

/**
 * Validates the order details provided in the ICustomer object.
 * @param {ICustomer} customer - The ICustomer object containing customer details.
 * @returns {string[]} An array of error messages, if any, based on the validation rules.
 */
const validateOrder = ({
  customerName,
  address,
  contact,
}: ICustomer): string[] => {
  const errors: string[] = [];

  if (!customerName || !/^[A-Za-z]/.test(customerName)) {
    errors.push('customerName');
  }

  if (!contact || !/^\+?\d{10}$/.test(contact)) {
    errors.push('contact');
  }

  if (!address) {
    errors.push('address');
  }

  return errors;
};

/**
 * Validates the product details provided in the IProduct object.
 * @param {IProduct} product - The IProduct object containing product details.
 * @returns {string[]} An array of error messages, if any, based on the validation rules.
 */
const validateProduct = ({
  title,
  description,
  category,
  price,
  imageUrl,
  availableQuantity,
}: IProduct): string[] => {
  const errors: string[] = [];

  if (!title) {
    errors.push('title');
  }

  if (!description) {
    errors.push('description');
  }

  if (!category) {
    errors.push('category');
  }

  if (price <= 0 || isNaN(price)) {
    errors.push('price');
  }

  if (!imageUrl) {
    errors.push('imageUrl');
  }

  if (!availableQuantity || isNaN(availableQuantity) || availableQuantity <= 0) {
    errors.push('availableQuantity');
  }

  return errors;
};

export { validateOrder, validateProduct };
