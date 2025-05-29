import React from 'react';
import Link from 'next/link';
import styles from './Logo.module.scss';

const Logo: React.FC = () => {
  return (
    <Link href="/" className={styles.link}>
      Apex Vortex
    </Link>
  );
};

export default Logo;