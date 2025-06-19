import React from 'react';
import LoginForm from './LoginForm';
import styles from './page.module.scss';

export default function LoginPage() {
    return (
        <div className={styles.container}>
            <div className={styles.modal}>
                <h2>Вход</h2>
                <LoginForm />
            </div>
        </div>
    );
}
