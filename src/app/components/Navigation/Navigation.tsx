"use client";
import React from 'react';
import Logo from './Logo';
import Cart from './Cart';
import styles from './Navigation.module.scss';
import { useAuth } from '@/app/context/AuthContext';
import Link from 'next/link';
import { FaUser, FaSignOutAlt, FaClipboardList } from 'react-icons/fa';


const Navigation: React.FC = () => {
    const { isAuthenticated, email, logout } = useAuth();

    return (
        <header className={styles.header}>
            <div className={styles.headerRow}>
                <div className={styles.leftPlaceholder}>
                    {isAuthenticated && (
                        <div className={styles.leftIcons}>
                            <button
                                className={styles.iconBtn}
                                aria-label="Выйти"
                                onClick={logout}
                                type="button"
                            >
                                <FaSignOutAlt className={styles.icons} size={25} />
                            </button>
                            <Link href="/orders" className={styles.iconBtn} aria-label="Заказы">
                                <FaClipboardList className={styles.icons} size={25} />
                            </Link>
                        </div>
                    )}
                </div>
                <div className={styles.centerLogo}>
                    <Logo />
                </div>
                <div className={styles.rightBlock}>
                    <Cart />
                    {!isAuthenticated ? (
                        <Link href="/login" className={styles.authBtn} aria-label="Вход или регистрация">
                            <FaUser className={styles.icons} size={25} />
                        </Link>
                    ) : (
                        <span className={styles.userEmail}>{email}</span>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navigation;
