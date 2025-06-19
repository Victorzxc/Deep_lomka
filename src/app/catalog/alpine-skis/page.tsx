import React from 'react';
import Link from 'next/link';
import styles from './AlpineSkisPage.module.scss';
import { fetchProducts } from '@/app/utils/api';
import { Product } from '@/app/types/product';
import AlpineSkisClient from './AlpineSkisClient';

const ALPINE_SKIS_CATEGORY_ID = 5;

export default async function AlpineSkisPage() {
    const initialProducts: Product[] = await fetchProducts();
    const alpineSkis = initialProducts.filter(p => p.categoryId === ALPINE_SKIS_CATEGORY_ID);

    return (
        <div className={styles.alpineSkisPage}>
            <div className={styles.header}>
                <h1 className={styles.title}>Горные лыжи</h1>
                <div className={styles.breadcrumbs}>
                    <Link href="/">Назад</Link> / <Link href="/catalog">Каталог</Link> / Лыжи горные
                </div>
            </div>
            <AlpineSkisClient initialProducts={alpineSkis} />
        </div>
    );
}
