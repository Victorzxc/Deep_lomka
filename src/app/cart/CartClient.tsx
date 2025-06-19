'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { FaTrashAlt } from 'react-icons/fa';
import styles from './CartPage.module.scss';

interface CartItem {
    id: number;
    productId: number;
    quantity: number;
    product: {
        id: number;
        name: string;
        price: number;
        imageUrl?: string;
    };
}

const cities = [
    "Кострома", "Москва", "Санкт-Петербург", "Новосибирск", "Владивосток",
    "Краснодар", "Екатеринбург", "Казань", "Нижний Новгород", "Челябинск",
    "Самара", "Омск", "Другой город"
];

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const CartClient = () => {
    const [selectedCity, setSelectedCity] = useState('');
    const [customCity, setCustomCity] = useState('');
    const { isAuthenticated, token } = useAuth();
    const router = useRouter();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [orderLoading, setOrderLoading] = useState(false);

    const fetchCart = useCallback(async () => {
        setLoading(true);
        const res = await fetch(`${BACKEND_URL}/cart`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
            setCartItems(await res.json());
        }
        setLoading(false);
    }, [token]);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
        } else {
            fetchCart();
        }
    }, [isAuthenticated, fetchCart, router]);

    const updateQuantity = useCallback(async (productId: number, quantity: number) => {
        if (quantity < 1) return;

        await fetch(`${BACKEND_URL}/cart/update/${productId}/${quantity}`, {
            method: 'PUT',
            headers: { Authorization: `Bearer ${token}` }
        });
        fetchCart();
    }, [token, fetchCart]);


    const handleDecreaseQuantity = useCallback((productId: number, currentQuantity: number) => () => {
        if (currentQuantity > 1) {
            updateQuantity(productId, currentQuantity - 1);
        }
    }, [updateQuantity]);

    const handleIncreaseQuantity = useCallback((productId: number, currentQuantity: number) => () => {
        updateQuantity(productId, currentQuantity + 1);
    }, [updateQuantity]);


    const removeItem = useCallback(async (productId: number) => {
        await fetch(`${BACKEND_URL}/cart/remove/${productId}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` }
        });
        fetchCart();
    }, [token, fetchCart]);

    const handleRemoveItem = useCallback((productId: number) => () => {
        removeItem(productId);
    }, [removeItem]);


    const handleSelectedCityChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCity(e.target.value);
    }, []);

    const handleCustomCityChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const regex = /^[a-zA-Zа-яА-ЯёЁ\s-]*$/;
        if (value === '' || regex.test(value)) {
            setCustomCity(value);
        }
    }, []);

    const handleOrder = useCallback(async () => {
        setOrderLoading(true);
        const cartItemIds = cartItems.map(item => item.id);
        const shippingAddress = selectedCity === "Другой город" ? customCity.trim() : selectedCity;

        if (!shippingAddress) {
            alert('Пожалуйста, выберите город доставки');
            setOrderLoading(false);
            return;
        }

        const cityRegex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;
        if (!cityRegex.test(shippingAddress)) {
            alert('Пожалуйста, введите корректное название города (только буквы, пробелы и дефисы)');
            setOrderLoading(false);
            return;
        }

        const res = await fetch(`${BACKEND_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ shippingAddress, cartItemIds })
        });

        if (res.ok) {
            setCartItems([]);
            router.push('/orders');
        } else {
            alert('Ошибка при оформлении заказа. Попробуйте позже.');
        }
        setOrderLoading(false);
    }, [cartItems, customCity, router, selectedCity, token]);

    if (!isAuthenticated) {
        return <div>Необходимо войти в аккаунт</div>;
    }

    const sortedCartItems = [...cartItems].sort((a, b) => a.id - b.id);

    return (
        <>
            <div className={styles.cartSidebar}>
                <h2 className={styles.cartTitle}>Корзина</h2>

                <div className={styles.deliveryBlock}>
                    <select
                        id="city-select"
                        value={selectedCity}
                        onChange={handleSelectedCityChange}
                        className={styles.citySelect}
                    >
                        <option disabled value="">Выберите город для доставки</option>
                        {cities.map(city => (
                            <option className={styles.cityOption} key={city} value={city}>{city}</option>
                        ))}
                    </select>
                    {selectedCity === "Другой город" && (
                        <input
                            type="text"
                            placeholder="Введите город"
                            value={customCity}
                            onChange={handleCustomCityChange}
                            className={styles.cityInput}
                        />
                    )}
                </div>

                <button
                    onClick={handleOrder}
                    disabled={cartItems.length === 0 || orderLoading}
                    className={styles.cartOrderBtn}
                >
                    {orderLoading ? 'Оформление...' : 'Заказать'}
                </button>
            </div>
            <div className={styles.cartList}>
                {loading ? (
                    <div className={styles.cartLoading}>Загрузка...</div>
                ) : cartItems.length === 0 ? (
                    <div className={styles.cartEmpty}>Корзина пуста</div>
                ) : (
                    sortedCartItems.map(item => (
                        <div key={item.id} className={styles.cartItem}>
                            {item.product?.imageUrl && (
                                <img
                                    src={
                                        item.product.imageUrl.startsWith('http')
                                            ? item.product.imageUrl
                                            : `${BACKEND_URL}${item.product.imageUrl}`
                                    }
                                    alt={item.product.name}
                                    className={styles.cartItemImage}
                                />
                            )}
                            <div className={styles.cartItemInfo}>
                                <div className={styles.cartItemName}>{item.product?.name || 'Без названия'}</div>
                                <div className={styles.cartItemPrice}>
                                    {item.product?.price ? `Цена: ${Number(item.product.price)} ₽` : 'Цена не указана'}
                                </div>
                            </div>
                            <div className={styles.cartItemControls}>
                                <button className={styles.buttonQuantity} onClick={handleDecreaseQuantity(item.productId, item.quantity)}>-</button>
                                <span>{item.quantity}</span>
                                <button className={styles.buttonQuantity} onClick={handleIncreaseQuantity(item.productId, item.quantity)}>+</button>
                                <button
                                    onClick={handleRemoveItem(item.productId)}
                                    className={styles.cartRemoveBtn}
                                    aria-label="Удалить товар"
                                >
                                    <FaTrashAlt />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
};

export default CartClient;
