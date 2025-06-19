import React from 'react';
import OrdersClient from './OrdersClient';
import styles from './page.module.scss';

export default function OrdersPage() {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.ordersBanner}>
                <h1 className={styles.bannerTitle}>История заказов</h1>
            </div>
            <OrdersClient />
        </div>
    );
}
