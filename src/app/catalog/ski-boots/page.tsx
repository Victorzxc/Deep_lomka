import React from 'react';
import Link from 'next/link';
import styles from './SkiBootsPage.module.scss';
import { fetchProducts } from '@/app/utils/api';
import { Product } from '@/app/types/product';
import SkiBootsClient from './SkiBootsClient';

const SKIBOOTS_CATEGORY_ID = 6;

export default async function SkiBootsPage() {
    const products: Product[] = await fetchProducts();
    const skiBoots = products.filter(product => product.categoryId === SKIBOOTS_CATEGORY_ID);

    return (
        <div className={styles.skiBootsPage}>
            <div className={styles.header}>
                <h1 className={styles.title}>Горнолыжные ботинки</h1>
                <div className={styles.breadcrumbs}>
                    <Link href="/">Назад</Link> / <Link href="/catalog">Катало</Link> / Горнолыжные ботинки
                </div>
            </div>
            <div className={styles.content}>
                <SkiBootsClient initialProducts={skiBoots} />
            </div>
        </div>
    );
}
