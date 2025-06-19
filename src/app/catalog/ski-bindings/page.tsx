import React from 'react';
import Link from 'next/link';
import styles from './SkiBindingsPage.module.scss';
import { fetchProducts } from '@/app/utils/api';
import { Product } from '@/app/types/product';
import SkiBindingsClient from './SkiBindingsClient';


const SKI_BINDINGS_CATEGORY_ID = 7;

export default async function SkiBindingsPage() {
    const products: Product[] = await fetchProducts();
    const skiBindings = products.filter(product => product.categoryId === SKI_BINDINGS_CATEGORY_ID);

    return (
        <div className={styles.skiBindingsPage}>
            <div className={styles.header}>
                <h1 className={styles.title}>Крепления для горных лыж</h1>
                <div className={styles.breadcrumbs}>
                    <Link href="/">Назад</Link> / <Link href="/catalog">Каталог</Link> / Крепления для горных лыж
                </div>
            </div>
            <div className={styles.content}>
                <SkiBindingsClient initialProducts={skiBindings} />
            </div>
        </div>
    );
}
