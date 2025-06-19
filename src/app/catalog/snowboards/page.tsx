import React from 'react';
import Link from 'next/link';
import styles from './SnowboardsPage.module.scss';
import { fetchProducts } from '@/app/utils/api';
import { Product } from '@/app/types/product';
import SnowboardsClient from './SnowboardsClient';

const SNOWBOARDS_CATEGORY_ID = 10;

export default async function SnowboardsPage() {
    const products: Product[] = await fetchProducts();
    const snowboards = products.filter(product => product.categoryId === SNOWBOARDS_CATEGORY_ID);

    return (
        <div className={styles.snowboardsPage}>
            <div className={styles.header}>
                <h1 className={styles.title}>Сноуборды</h1>
                <div className={styles.breadcrumbs}>
                    <Link href="/">Назад</Link> / <Link href="/catalog">Каталог</Link> / Сноуборды
                </div>
            </div>
            <SnowboardsClient initialProducts={snowboards} />
        </div>
    );
}
