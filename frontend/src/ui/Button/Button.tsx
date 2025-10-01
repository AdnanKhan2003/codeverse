import styles from './Button.module.css';

import { ButtonProps } from '@/types/button';

const Button = ({ children, name, Icon, type, size, style, classes = "", ...props }: ButtonProps) => {
  const sizeClass = size ? `button__${size}` : 'button__medium';

  if (Icon) {
    return (
      <button style={style} className={`${styles.button} ${styles[sizeClass]} ${styles[classes]}`} name={name} type={type} {...props}>{<Icon />}</button>  
    );
  }

  return (
    <button style={style} className={`${styles.button} ${styles[sizeClass]}`} name={name} type={type} {...props}>{children}</button>
  )
}

export default Button