import React from 'react';
import styles from './Input.module.scss';

interface InputProps {
    type: string;
    name: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}

const Input: React.FC<InputProps> = ({ type, name, placeholder, value, onChange, required }) => {
    return (
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            className={styles.input}
            maxLength={20}
        />
    );
};

export default Input;