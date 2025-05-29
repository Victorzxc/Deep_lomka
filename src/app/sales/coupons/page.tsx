import React from 'react';
import styles from './CouponsPage.module.scss';

const CouponsPage = () => {
  return (
    <div className={styles.couponsPage}>
      <h1>Купоны</h1>
      <p>На данный момент нет доступных купонов.</p>
    </div>
  );
};

export default CouponsPage;