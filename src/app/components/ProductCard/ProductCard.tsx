import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './ProductCard.module.scss';

interface Product {
    id: number;
    name: string;
    image: string;
    price: number;
}

const ProductCard: React.FC<Product> = ({ id, name, image, price }) => {
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || '';
    const imageSrc =
        typeof image === 'string' && image.startsWith('http')
            ? image
            : `${BACKEND_URL}${image || 'images/product-placeholder.png'}`;


    return (
        <Link href={`/products/${id}`} className={styles.card}>
            <div className={styles.imageWrapper}>
                <Image
                    src={imageSrc}
                    alt={name}
                    width={200}
                    height={200}
                    className={styles.image}
                    unoptimized={true}
                />
            </div>
            <div className={styles.details}>
                <h3 className={styles.name}>{name}</h3>
                <p className={styles.price}>{Number(price).toFixed(2)} ₽</p>
            </div>
        </Link>
    );
};

export default ProductCard;
