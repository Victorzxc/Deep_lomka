import React from 'react';
import Link from 'next/link';
import styles from './CatalogDropdown.module.scss';

const categories = [
  { name: 'Крепления горнолыжные', path: '/catalog/ski-bindings' },
  { name: 'Экипировка', path: '/catalog/equipment' },
  { name: 'Защита', path: '/catalog/protection' },
  { name: 'Горные лыжи', path: '/catalog/alpine-skis' },
  { name: 'Сноуборды', path: '/catalog/snowboards' },
];

const CatalogDropdown: React.FC = () => (
  <div className={styles.dropdown}>
    {categories.map((cat) => (
      <Link key={cat.path} href={cat.path} className={styles.dropdownItem}>
        {cat.name}
      </Link>
    ))}
  </div>
);

export default CatalogDropdown;
