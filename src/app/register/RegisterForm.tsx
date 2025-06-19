'use client';

import React, { useState } from 'react';
import { Button } from '@/app/components/UI/Button/Button';
import Input from '@/app/components/UI/Input/Input';
import { useAuth } from '@/app/context/AuthContext';
import Link from 'next/link';
import styles from './page.module.scss';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const RegisterForm = () => {
    const { login } = useAuth();
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        agreement: false,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const response = await fetch(`${BACKEND_URL}/auth/registration`, {
                method: 'POST',
                body: JSON.stringify({ email: formData.email, password: formData.password }),
                headers: { 'Content-Type': 'application/json' },
            });

            const data = await response.json();

            if (response.ok) {
                login(data.token);
                alert('Регистрация прошла успешно!');
            } else {
                setError(data.message || 'Ошибка регистрации');
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('Произошла ошибка');
            }
        }

    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const isFormValid =
        formData.email &&
        formData.password &&
        formData.confirmPassword &&
        formData.agreement &&
        formData.password === formData.confirmPassword;

    return (
        <>
            {error && <div className={styles.error}>{error}</div>}
            <form className={styles.forma} onSubmit={handleSubmit}>
                <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    value={formData.password}
                    onChange={handleChange}
                />
                <Input
                    type="password"
                    name="confirmPassword"
                    placeholder="Повторите пароль"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />
                <label>
                    <input
                        type="checkbox"
                        name="agreement"
                        checked={formData.agreement}
                        onChange={handleChange}
                    />
                    Согласие на обработку данных
                </label>

                <Button
                    type="submit"
                    disabled={!isFormValid}
                    color={isFormValid ? 'primary' : 'secondary'}
                >
                    Зарегистрироваться
                </Button>
                <Link href="/login" className={styles.authButton}> Авторизация</Link>
            </form>
        </>
    );
};

export default RegisterForm;
