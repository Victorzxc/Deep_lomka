import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './ProductPage.module.scss';
import { fetchProductById, fetchProductCharacteristics } from '@/app/utils/api';
import { Product, ProductCharacteristic } from '@/app/types/product';
import AddToCartButton from './AddToCartButton';



const CATEGORY_MAP: Record<number, { link: string; name: string }> = {
    5: { link: '/catalog/alpine-skis', name: 'Горные лыжи' },
    7: { link: '/catalog/ski-bindings', name: 'Крепления для горных лыж' },
    10: { link: '/catalog/snowboards', name: 'Сноуборды' },
    8: { link: '/catalog/protection', name: 'Защита' },
    6: { link: '/catalog/ski-boots', name: 'Горнолыжные ботинки' },
};

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL 
async function fetchBrands() {
    const res = await fetch(`${BACKEND_URL}/brands`);
    if (!res.ok) throw new Error('Ошибка загрузки брендов');
    return res.json();
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const productId = Number(id);
    let product: Product;
    let characteristics: ProductCharacteristic[] = [];
    let brands: { id: number; name: string; logoUrl: string }[] = [];

    try {
        product = await fetchProductById(productId);
        characteristics = await fetchProductCharacteristics(productId);
        brands = await fetchBrands();
    } catch {
        return <div>Товар не найден</div>;
    }

    const category = CATEGORY_MAP[product.categoryId] || { link: '/catalog', name: 'Каталог' };

    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const imageSrc = product.imageUrl.startsWith('http')
        ? product.imageUrl
        : `${BACKEND_URL}${product.imageUrl}`;

    const brand = brands.find(b => b.id === product.brandId);

    const brandLogoSrc = brand
        ? (brand.logoUrl.startsWith('http')
            ? brand.logoUrl
            : `${process.env.NEXT_PUBLIC_BACKEND_URL}${brand.logoUrl}`)
        : null;


    return (
        <div className={styles.productPage}>
            <div className={styles.breadcrumbs}>
                <Link href="/">Назад</Link> / <Link href="/catalog">Каталог</Link> /{' '}
                <Link href={category.link}>{category.name}</Link> / {product.name}
            </div>
            <div className={styles.productContainer}>
                <div className={styles.imageColumn}>
                    <Image
                        className={styles.img}
                        src={imageSrc}
                        alt={product.name}
                        width={400}
                        height={400}
                        unoptimized={true}
                    />
                </div>
                <div className={styles.detailsColumn}>
                    <div>
                        <div className={styles.logoName}>
                        <h1 className={styles.productName}>
                            {product.name}
                        </h1>
                        {brandLogoSrc && (
                            <Image
                                src={brandLogoSrc}
                                alt={brand?.name || 'Логотип бренда'}
                                width={70}
                                height={70}
                                className={styles.brandLogo}
                                unoptimized={true}
                            />
                        )}
                        </div>
  
                        <p className={styles.description}>{product.description}</p>
                        <div className={styles.characteristics}>
                            {characteristics.map((ch) => (
                                <div className={styles.characteristic} key={ch.id}>
                                    <span className={styles.characteristicLabel}>{ch.characteristic.name}:</span>
                                    <span>{ch.value} {ch.characteristic.unit}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.priceContainer}>
                        <span className={styles.price}>{product.price.toFixed(2)} ₽</span>
                        <AddToCartButton productId={product.id} />
                    </div>
                </div>
            </div>
        </div>
    );
}
