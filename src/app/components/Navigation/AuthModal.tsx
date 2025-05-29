"use client";
import React, { useState } from "react";
import Link from 'next/link';
import styles from "./AuthModal.module.scss";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ open, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {

      onClose();

    } catch (error: any) {
      setError(error.message || 'Произошла ошибка');
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>×</button>
        <form className={styles.form} onSubmit={handleSubmit}>
          {error && <div className={styles.error}>{error}</div>}
          <input
            type="text"
            placeholder="эл.почта/телефон"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className={styles.loginBtn}>ВОЙТИ</button>
        </form>
        <hr className={styles.hr} />
        <Link href="/register" className={styles.registerBtn}>
          РЕГИСТРАЦИЯ &rarr;
        </Link>
      </div>
    </div>
  );
};

export default AuthModal;