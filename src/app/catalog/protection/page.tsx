import React from 'react';
import Link from 'next/link';
import ProductList from '@/app/components/ProductList/ProductList';
import FilterSidebar from '@/app/components/FilterSidebar/FilterSidebar';
import styles from './ProtectionPage.module.scss';
import productsData from '@/app/data/products.json';

const ProtectionPage = () => {
  const protectionProducts = productsData.filter(product => product.categoryId === "protection");

  return (
    <div className={styles.protectionPage}>
      <div className={styles.header}>
        <h1 className={styles.title}>Защита</h1>
        <div className={styles.breadcrumbs}>
          <Link href="/">Назад</Link> / <Link href="/catalog">Каталог</Link> / Защита
        </div>
      </div>
      <div className={styles.content}>
        <FilterSidebar category="protection" />
        <ProductList products={protectionProducts} />
      </div>
    </div>
  );
};

export default ProtectionPage;