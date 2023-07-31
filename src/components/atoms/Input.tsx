import { Form } from 'react-bootstrap';

/**
 * Reusable Input component using React Bootstrap Form.
 * @param {InputProps} props - Props for configuring the input.
 * @returns {JSX.Element} The Input component with a label, input field, and validation feedback.
 */

interface InputProps {
  label: string;
  value: string;
  type: string;
  placeholder: string;
  onChange: (value: string) => void;
  isInvalid?: boolean;
}

const Input = ({
  label,
  value,
  type,
  placeholder,
  onChange,
  isInvalid,
}: InputProps) => {
  return (
    <Form.Group className='mb-3' controlId={`formBasic${label}`}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        isInvalid={isInvalid}
      />
      <Form.Control.Feedback type='invalid'>
        Please enter a valid {label.toLowerCase()}.
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default Input;
