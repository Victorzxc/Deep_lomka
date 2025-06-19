import React from 'react';
import CartClient from './CartClient';
import styles from './CartPage.module.scss';

export default async function CartPage() {


    return (
        <div className={styles.cartContainer}>
            <CartClient />
        </div>
    );
}
