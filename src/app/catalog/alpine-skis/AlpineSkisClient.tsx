'use client';

import React, { useState, useCallback } from 'react';
import ProductList from '@/app/components/ProductList/ProductList';
import AlpineSkisFilterSidebar from './AlpineSkisFilterSidebar';
import { filterProducts } from '@/app/utils/api';
import { Product } from '@/app/types/product';
import styles from './AlpineSkisPage.module.scss';

interface Props {
    initialProducts: Product[];
}

export interface AlpineSkisFilters {
    priceFrom: number;
    priceTo: number;
    sizeFrom: number;
    sizeTo: number;
    waistFrom: number;
    waistTo: number;
    brands: string[];
    mountainTypes: string[];
    genders: string[];
}

const BRAND_MAP: Record<string, number> = {
    Head: 7,
    Rossignol: 8,
    Salomon: 10,
    K2: 11,
    Atomic: 12,
    Fisher: 13,
    Nordica: 20,
};

function rangeToArray(from: number, to: number): string[] {
    const arr = [];
    for (let i = from; i <= to; i++) {
        arr.push(i.toString());
    }
    return arr;
}

const AlpineSkisClient: React.FC<Props> = ({ initialProducts }) => {
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [isLoading, setIsLoading] = useState(false);

    const handleApplyFilters = useCallback(async (filters: AlpineSkisFilters) => {
        setIsLoading(true);
        try {
            const brandIds = (filters.brands || [])
                .map((brandName: string) => BRAND_MAP[brandName])
                .filter((id: number | undefined): id is number => typeof id === 'number');

            const characteristics = [
                ...(filters.mountainTypes ?? []).map((type: string) => ({ characteristicId: 24, value: type })),
                ...(filters.genders ?? []).map((gender: string) => ({ characteristicId: 8, value: gender })),
                ...rangeToArray(filters.sizeFrom, filters.sizeTo).map(length => ({ characteristicId: 20, value: length })),
                ...rangeToArray(filters.waistFrom, filters.waistTo).map(width => ({ characteristicId: 21, value: width })),
            ];

            const filterBody = {
                categoryId: 5,
                brandIds,
                minPrice: filters.priceFrom,
                maxPrice: filters.priceTo,
                characteristics,
            };

            const filteredProducts = await filterProducts(filterBody);
            setProducts(filteredProducts);
        } catch (error) {
            console.error('Ошибка фильтрации', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <div className={styles.content}>
            <div className={styles.filterSidebar}>
                <AlpineSkisFilterSidebar category="alpine-skis" onApplyFilters={handleApplyFilters} />
            </div>
            <div className={styles.productList}>
                {isLoading ? <p>Загрузка...</p> : <ProductList products={products} />}
            </div>
        </div>
    );
};

export default AlpineSkisClient;
