"use client";
import React, { useState } from 'react';
import Logo from './Logo';
import SearchBar from './SearchBar';
import Cart from './Cart';
import AuthModal from './AuthModal';
import MainMenu from './MainMenu';
import styles from './Navigation.module.scss';


const Navigation: React.FC = () => {
  const [authOpen, setAuthOpen] = useState(false);
  return (
    <header className={styles.header}>
        <Logo />
        <MainMenu />
        <div className={styles.headerTop}>
          <SearchBar />
          <Cart />
          <button
            className={styles.authBtn}
            onClick={() => setAuthOpen(true)}>
            <span>Вход / регистрация</span>
          </button>
          <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
        </div>

    </header>
  );
};

export default Navigation;