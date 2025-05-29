import React from 'react';
import Link from 'next/link';
import styles from './SalesPage.module.scss';

const SalesPage = () => {
  return (
    <div className={styles.salesPage}>
      <h1>Акции и скидки</h1>
      <div className={styles.content}>
        <Link href="/sales/gift-cards" className={styles.block}>
          <img src="" alt="Подарочные карты" />
          <span>Подарочные карты</span>
        </Link>
        <Link href="/sales/coupons" className={styles.block}>
          <img src="" alt="Купоны" />
          <span>Купоны</span>
        </Link>
      </div>
    </div>
  );
};

export default SalesPage;