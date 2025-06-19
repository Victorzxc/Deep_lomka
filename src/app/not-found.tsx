import React from 'react';
import Link from 'next/link';
import styles from './404.module.scss';

export default function NotFound() {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>404</h1>
                <p className={styles.description}>Страница не найдена</p>
                <Link href="/" className={styles.button}>
                    Вернуться на главную страницу
                </Link>
            </div>
        </div>
    );
}