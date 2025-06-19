'use client';
import React, { useEffect, useState, useRef } from 'react';
import styles from './Home.module.scss';
import ProductCard from '@/app/components/ProductCard/ProductCard';

interface Product {
    id: number;
    name: string;
    imageUrl: string;
    image: string;
    price: number;
}

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const carouselRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
        fetch(`${BACKEND_URL}/products`)
            .then(res => res.json())
            .then((data: Product[]) => {
                const productsWithImage = data.map((product: Product) => ({
                    ...product,
                    image: product.imageUrl
                }));
                setProducts(productsWithImage);
            });
    }, []);



    const scroll = (direction: 'left' | 'right') => {
        if (carouselRef.current) {
            const cardWidth = 340;
            carouselRef.current.scrollBy({
                left: direction === 'right' ? cardWidth : -cardWidth,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.heroBanner}>
                <div className={styles.heroContent}>
                    <h1>Добро пожаловать в ApexVortex!</h1>
                    <p>Лучшие горные лыжи и экипировка для вашего отдыха</p>
                </div>
            </div>

            <h2 className={styles.sectionTitle}>Популярные товары</h2>
            <div className={styles.carouselWrapper}>
                <button
                    className={styles.arrow}
                    onClick={() => scroll('left')}
                    aria-label="Назад"
                >
                    ⬅
                </button>
                <div className={styles.carousel} ref={carouselRef}>
                    {products.map(product => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                </div>
                <button
                    className={styles.arrow}
                    onClick={() => scroll('right')}
                    aria-label="Вперёд"
                >
                    ⮕
                </button>
            </div>
        </div>
    );
}
