import React from 'react';
import Link from 'next/link';
import styles from './ProtectionPage.module.scss';
import { fetchProducts } from '@/app/utils/api';
import { Product } from '@/app/types/product';
import ProtectionClient from './ProtectionClient';

const PROTECTION_CATEGORY_ID = 8;

export default async function ProtectionPage() {
    const products: Product[] = await fetchProducts();
    const protectionProducts = products.filter(product => product.categoryId === PROTECTION_CATEGORY_ID);

    return (
        <div className={styles.protectionPage}>
            <div className={styles.header}>
                <h1 className={styles.title}>Защита</h1>
                <div className={styles.breadcrumbs}>
                    <Link href="/">Назад</Link> / <Link href="/catalog">Каталог</Link> / Защита
                </div>
            </div>
            <div className={styles.content}>
                <ProtectionClient initialProducts={protectionProducts} />
            </div>
        </div>
    );
}
