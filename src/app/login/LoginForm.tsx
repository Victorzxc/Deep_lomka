'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import Input from '@/app/components/UI/Input/Input';
import Link from 'next/link';
import styles from './page.module.scss';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const LoginForm = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const router = useRouter();
    const { login } = useAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const response = await fetch(`${BACKEND_URL}/auth/login`, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await response.json();
            if (response.ok) {
                login(data.token);
                router.push('/');
            } else {
                setError(data.message || 'Неверный email или пароль');
            }
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('Произошла ошибка');
            }
        }

    };

    return (
        <form className={styles.forma} onSubmit={handleSubmit}>
            {error && <div className={styles.error}>{error}</div>}
            <Input
                name="email"
                type="email"
                placeholder="Эл. почта"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <Input
                name="password"
                type="password"
                placeholder="Пароль"
                value={formData.password}
                onChange={handleChange}
                required
            />
            <button className={styles.authButton} type="submit">Войти</button>
            <Link href="/register" className={styles.authButton}>Регистрация</Link>
        </form>
    );
};

export default LoginForm;
