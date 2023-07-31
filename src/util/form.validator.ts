import * as Yup from 'yup';
import ICustomer from '@/types/customer.interface';
import IProduct from '@/types/product.interface';

/**
 * Yup schema for validating customer details.
 */

const customerSchema = Yup.object().shape({
  customerName: Yup.string()
    .required('Customer Name is required')
    .matches(/^[A-Za-z]/, 'Invalid customer name format'),
  address: Yup.string().required('Address is required'),
  contact: Yup.string()
    .required('Contact is required')
    .matches(/^\+?\d{10}$/, 'Invalid contact number format'),
});

/**
 * Yup schema for validating product details.
 */

const productSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  category: Yup.string().required('Category is required'),
  price: Yup.number()
    .positive('Price must be a positive number')
    .required('Price is required'),
  imageUrl: Yup.string().required('Image URL is required'),
  availableQuantity: Yup.number()
    .positive('Available quantity must be a positive number')
    .required('Available quantity is required'),
});

/**
 * Validates the order details provided in the ICustomer object.
 * @param {ICustomer} customer - The ICustomer object containing customer details.
 * @returns {Promise<string[]>} A Promise that resolves to an array of error messages, if any, based on the validation rules.
 */

const validateOrder = async (customer: ICustomer): Promise<string[]> => {
  try {
    await customerSchema.validate(customer, { abortEarly: false });
    return [];
  } catch (validationError) {
    if (validationError instanceof Yup.ValidationError) {
      return validationError.errors;
    }
    throw validationError;
  }
};

/**
 * Validates the product details provided in the IProduct object.
 * @param {IProduct} product - The IProduct object containing product details.
 * @returns {Promise<string[]>} A Promise that resolves to an array of error messages, if any, based on the validation rules.
 */

const validateProduct = async (product: IProduct): Promise<string[]> => {
  try {
    await productSchema.validate(product, { abortEarly: false });
    return [];
  } catch (validationError) {
    if (validationError instanceof Yup.ValidationError) {
      return validationError.errors;
    }
    throw validationError;
  }
};

export { validateOrder, validateProduct };
