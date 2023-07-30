import { ButtonHTMLAttributes } from "react"
import { Button as BootstrapButton } from 'react-bootstrap'

/**
 * Custom Button component that wraps the Bootstrap Button component.
 * @param {ButtonProps} props - Props for configuring the button.
 * @returns {JSX.Element} The custom Button component.
 */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "light" | "danger"
  customClass?: ""
}

const Button = ({
  children,
  variant = "primary",
  customClass,
  ...props
}: ButtonProps) => (
    <BootstrapButton variant={`outline-${variant}`} className={customClass} {...props}>
      {children}
    </BootstrapButton>
  )

export default Button
