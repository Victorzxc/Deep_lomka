import React from 'react';
import Link from 'next/link';
import ProductList from '@/app/components/ProductList/ProductList';
import FilterSidebar from '@/app/components/FilterSidebar/FilterSidebar';
import styles from './AlpineSkisPage.module.scss';
import productsData from '@/app/data/products.json';
const AlpineSkisPage = () => {

  const alpineSkis = productsData.filter(product => product.categoryId === "alpine-skis");

  return (
    <div className={styles.alpineSkisPage}>
      <div className={styles.header}>
        <h1 className={styles.title}>
            Горные лыжи
        </h1>
        <div className={styles.breadcrumbs}>
          <Link href="/">Назад</Link> / <Link href="/catalog">Каталог</Link> / Лыжи горные
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.filterSidebar}>
          <FilterSidebar category='alpine-skis'/>
        </div>
        <div className={styles.productList}>
          <ProductList products={alpineSkis} />
        </div>
      </div>
    </div>
  );
};

export default AlpineSkisPage;