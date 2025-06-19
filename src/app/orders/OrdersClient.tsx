'use client';

import React, { useEffect, useState } from 'react';
import styles from './page.module.scss';

interface Product {
    id: number;
    name: string;
    imageUrl?: string;
    price: number;
}

interface OrderItem {
    id: number;
    productId: number;
    quantity: number;
    price: number;
    product: Product;
}

interface Order {
    id: number;
    totalAmount: number;
    shippingAddress: string;
    status: string;
    createdAt: string;
    orderItems: OrderItem[];
}
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const OrdersClient = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Необходимо войти в аккаунт');
            setLoading(false);
            return;
        }

        fetch(`${BACKEND_URL}/orders`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(async res => {
                if (!res.ok) throw new Error('Ошибка загрузки заказов');
                const raw = await res.json();

                const normalized: Order[] = (raw as Order[]).map(order => ({
                    ...order,
                    totalAmount: Number(order.totalAmount),
                    orderItems: order.orderItems.map(item => ({
                        ...item,
                        price: Number(item.price),
                        product: {
                            ...item.product,
                            price: Number(item.product.price)
                        }
                    }))
                }));

                return normalized;
            })
            .then(data => setOrders(data))
            .catch(() => setError('Не удалось загрузить заказы'))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className={styles.loading}>Загрузка...</div>;
    if (error) return <div className={styles.error}>{error}</div>;
    if (orders.length === 0) return <div className={styles.empty}>У вас пока нет заказов.</div>;

    return (
        <div className={styles.ordersList}>
            {orders.map(order => (
                <div key={order.id} className={styles.orderCard}>
                    <div className={styles.orderHeader}>
                        <div>
                            <span className={styles.orderId}>Заказ №{order.id}</span>
                            <div className={styles.orderDate}>
                                {new Date(order.createdAt).toLocaleDateString('ru-RU', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </div>
                        </div>
                        <div
                            className={styles.orderStatus}
                            data-status={order.status.toLowerCase()}
                        >
                            {order.status}
                        </div>
                    </div>

                    <div className={styles.shippingAddress}>
                        <b>Адрес доставки:</b> {order.shippingAddress}
                    </div>

                    <ul className={styles.itemsList}>
                        {order.orderItems.map(item => (
                            <li key={item.id} className={styles.item}>
                                {item.product?.imageUrl && (
                                    <img
                                        src={
                                            item.product.imageUrl.startsWith('http')
                                                ? item.product.imageUrl
                                                : `${BACKEND_URL}${item.product.imageUrl}`
                                        }
                                        alt={item.product?.name}
                                        className={styles.itemImage}
                                    />
                                )}
                                <span className={styles.itemName}>{item.product?.name}</span>
                                <span className={styles.itemPrice}>
                                    {item.quantity} × {item.price.toFixed(2)} ₽
                                </span>
                            </li>
                        ))}
                    </ul>

                    <div className={styles.totalAmount}>
                        Итого: {order.totalAmount.toFixed(2)} ₽
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OrdersClient;
