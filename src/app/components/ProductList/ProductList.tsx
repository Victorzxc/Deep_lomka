import React from 'react';
import ProductCard from '@/app/components/ProductCard/ProductCard';
import styles from './ProductList.module.scss'

export interface IProduct {
    id: number;
    name: string;
    price: number;
    imageUrl: string | null;
    categoryId: number;
    createdAt?: string | Date;
    updatedAt?: string | Date;
}

interface ProductListProps {
    products: IProduct[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => (
    <div className={styles.List}>
        {products.map((product) => (
            <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.imageUrl ?? ''}
            />
        ))}
    </div>
);

export default ProductList;
