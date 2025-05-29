import React from 'react';
import Link from 'next/link';
import ProductList from '@/app/components/ProductList/ProductList';
import FilterSidebar from '@/app/components/FilterSidebar/FilterSidebar';
import styles from './EquipmentPage.module.scss';
import productsData from '@/app/data/products.json';

const EquipmentPage = () => {
  const equipmentProducts = productsData.filter(product => product.categoryId === "equipment");

  return (
    <div className={styles.equipmentPage}>
      <div className={styles.header}>
        <h1 className={styles.title}>Экипировка</h1>
        <div className={styles.breadcrumbs}>
          <Link href="/">Назад</Link> / <Link href="/catalog">Каталог</Link> / Экипировка
        </div>
      </div>
      <div className={styles.content}>
        <FilterSidebar category="equipment" />
        <ProductList products={equipmentProducts} />
      </div>
    </div>
  );
};

export default EquipmentPage;