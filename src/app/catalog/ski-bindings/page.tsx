import React from 'react';
import Link from 'next/link';
import ProductList from '@/app/components/ProductList/ProductList';
import FilterSidebar from '@/app/components/FilterSidebar/FilterSidebar';
import styles from './SkiBindingsPage.module.scss';
import productsData from '@/app/data/products.json';

const SkiBindingsPage = () => {
  const skiBindings = productsData.filter(product => product.categoryId === "ski-bindings");

  return (
    <div className={styles.skiBindingsPage}>
      <div className={styles.header}>
        <h1 className={styles.title}>Крепления для горных лыж</h1>
        <div className={styles.breadcrumbs}>
          <Link href="/">Назад</Link> / <Link href="/catalog">Каталог</Link> / Крепления для горных лыж
        </div>
      </div>
      <div className={styles.content}>
        <FilterSidebar category="ski-bindings" />
        <ProductList products={skiBindings} />
      </div>
    </div>
  );
};

export default SkiBindingsPage;