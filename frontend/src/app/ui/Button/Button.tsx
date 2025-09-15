import styles from './Button.module.css';

import { ButtonProps } from '@/app/types/button';

const Button = ({ children, name, type, size, style, ...props }: ButtonProps) => {
  const sizeClass = size ? `button__${size}` : 'button__medium';

  return (
    <button style={style} className={`${styles.button} ${styles[sizeClass]}`} name={name} type={type} {...props}>{children}</button>
  )
}

export default Button