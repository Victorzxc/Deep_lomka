// src/app/register/page.tsx
"use client";
import React, { useState } from 'react';
import styles from './page.module.scss'; 
import { Button } from '@/app/components/UI/Button/Button'; 
import Input from '@/app/components/UI/Input/Input';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreement, setAgreement] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    // TODO: Отправка данных на сервер
    try {
      // const response = await fetch('/api/register', {
      //   method: 'POST',
      //   body: JSON.stringify({ email, login, password }),
      //   headers: { 'Content-Type': 'application/json' },
      // });

      // if (!response.ok) {
      //   const data = await response.json();
      //   setError(data.message || 'Ошибка регистрации');
      //   return;
      // }

      // После успешной регистрации:
      alert('Регистрация прошла успешно!');
    } catch (error: any) {
      setError(error.message || 'Произошла ошибка');
    }
  };

  const isFormValid = email && login && password && confirmPassword && agreement && password === confirmPassword;

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h2>Регистрация</h2>
        <form className={styles.forma} onSubmit={handleSubmit}>
          {error && <div className={styles.error}>{error}</div>}
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Логин"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Повторите пароль"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <label>
            <input
              type="checkbox"
              checked={agreement}
              onChange={(e) => setAgreement(e.target.checked)}
            />
            Согласие на обработку данных
          </label>
          <Button type="submit" disabled={!isFormValid} color={isFormValid ? 'primary' : 'secondary'}>
            Зарегистрироваться
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;