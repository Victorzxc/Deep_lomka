import React from 'react';
import Link from 'next/link';
import ProductList from '@/app/components/ProductList/ProductList';
import FilterSidebar from '@/app/components/FilterSidebar/FilterSidebar';
import styles from './SnowboardsPage.module.scss';
import productsData from '@/app/data/products.json';

const SnowboardsPage = () => {
  const snowboards = productsData.filter(product => product.categoryId === "snowboards");

  return (
    <div className={styles.snowboardsPage}>
      <div className={styles.header}>
        <h1 className={styles.title}>Сноуборды</h1>
        <div className={styles.breadcrumbs}>
          <Link href="/">Назад</Link> / <Link href="/catalog">Каталог</Link> / Сноуборды
        </div>
      </div>
      <div className={styles.content}>
        <FilterSidebar category="snowboards" />
        <ProductList products={snowboards} />
      </div>
    </div>
  );
};

export default SnowboardsPage;