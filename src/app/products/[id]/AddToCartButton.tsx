'use client';

import React, { useState } from 'react';
import styles from './ProductPage.module.scss';

interface AddToCartButtonProps {
    productId: number;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ productId }) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleAdd = async () => {
        setError(null);
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        if (!token) {
            setError('Войдите, чтобы добавить товар в корзину');
            return;
        }
        setLoading(true);
        try {
            const res = await fetch(`${BACKEND_URL}/cart/add/${productId}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!res.ok) throw new Error('Ошибка при добавлении');
            setSuccess(true);
            setTimeout(() => setSuccess(false), 1500);
        } catch {
            setError('Не удалось добавить в корзину');
        }
        setLoading(false);
    };

    return (
        <div>
            <button
                className={styles.addToCartButton}
                onClick={handleAdd}
                disabled={loading}
                style={{ minWidth: 140 }}
            >
                {loading ? 'Добавление...' : 'Добавить в корзину'}
            </button>
            {success && <div style={{ color: 'green', fontSize: 14 }}>Добавлено!</div>}
            {error && <div style={{ color: 'red', fontSize: 14 }}>{error}</div>}
        </div>
    );
};

export default AddToCartButton;
