"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import CatalogDropdown from './CatalogDropdown';
import styles from './MainMenu.module.scss';

const MainMenu: React.FC = () => {
  const [isCatalogOpen, setCatalogOpen] = useState(false);

  return (
    <nav className={styles.mainMenu}>
      <div
        className={styles.menuItem}
        onMouseEnter={() => setCatalogOpen(true)}
        onMouseLeave={() => setCatalogOpen(false)}
      >
        <span className={styles.link}>Каталог</span>
        {isCatalogOpen && <CatalogDropdown />}
      </div>
      <Link href="/sales" className={styles.link}>Акции и скидки</Link>
      <Link href="/news" className={styles.link}>Новости</Link>
    </nav>
  );
};

export default MainMenu;
