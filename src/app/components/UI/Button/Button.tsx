import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  type: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  color?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ type, onClick, children, disabled, color }) => {
  const buttonClass = `${styles.button} ${color === 'primary' ? styles.primary : styles.secondary}`;

  return (
    <button type={type} onClick={onClick} className={buttonClass} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;