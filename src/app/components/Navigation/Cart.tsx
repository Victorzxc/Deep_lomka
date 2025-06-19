import React from 'react';
import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';
import styles from './Navigation.module.scss'

const Cart: React.FC = () => {
    return (
        <nav>
            <Link href="/cart">
                <FaShoppingCart className={styles.icons} size={30} />
            </Link>
        </nav>
    );
};

export default Cart; 
