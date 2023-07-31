import { Form } from 'react-bootstrap';

/**
 * Reusable Select component using React Bootstrap Form.
 * @param {SelectProps} props - Props for configuring the select.
 * @returns {JSX.Element} The Select component with a label and options.
 */

interface SelectProps {
  label: string;
  value: string;
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
}

const Select = ({ label, value, onChange, options }: SelectProps) => {
  return (
    <Form.Group className='mb-3' controlId={`formBasic${label}`}>
      <Form.Label>{label}</Form.Label>
      <Form.Select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

export default Select;
