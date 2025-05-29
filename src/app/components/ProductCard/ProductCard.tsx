import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './ProductCard.module.scss'

interface Product {
  id: string; 
  name: string;
  image: string;  
  price: number;
  description: string;

}

const ProductCard: React.FC<Product> = ({ id, name, image, description, price }) => {
  return (
    <Link href={`/products/${id}`} className={styles.card}> 
      <Image
        src={image}
        alt={name}
        width={200} 
        height={200} 
        className={styles.image}
      />
      <div className={styles.details}>
        <h3 className={styles.name}>{name}</h3>
        <h4 className={styles.description}>{description}</h4>
        <p className={styles.price}>${price.toFixed(2)}</p>
      </div>
    </Link>
  );
};

export default ProductCard;