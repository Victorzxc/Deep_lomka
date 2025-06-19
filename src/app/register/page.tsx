import React from 'react';
import RegisterForm from './RegisterForm';
import styles from './page.module.scss';

export default function RegisterPage() {
    return (
        <div className={styles.container}>
            <div className={styles.modal}>
                <h2>Регистрация</h2>
                <RegisterForm />
            </div>
        </div>
    );
}
