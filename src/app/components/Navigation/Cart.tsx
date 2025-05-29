import React from 'react';
import Link from 'next/link';
import styles from './Navigation.module.scss'

const Cart: React.FC = () => {
  return (
    <nav className={styles.cart}>
      <Link href="/cart">Корзина</Link>
    </nav>
  );
};

export default Cart;