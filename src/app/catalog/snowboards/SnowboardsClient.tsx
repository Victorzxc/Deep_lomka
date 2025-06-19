'use client';

import React, { useState, useCallback } from 'react';
import ProductList from '@/app/components/ProductList/ProductList';
import FilterSidebarSnowboards from '@/app/catalog/snowboards/FilterSidebarSnowboards';
import { filterProducts } from '@/app/utils/api';
import { Product } from '@/app/types/product';
import styles from './SnowboardsPage.module.scss';

interface Props {
    initialProducts: Product[];
}

const BRAND_MAP: Record<string, number> = {
    Rossignol: 8,
    Burton: 9,
    K2: 11,
    Ride: 21,
};

const MOUNTAIN_TYPE_CHARACTERISTIC_ID = 23;
const GENDER_CHARACTERISTIC_ID = 8;
const SIZE_CHARACTERISTIC_ID = 25;
const STIFFNESS_CHARACTERISTIC_ID = 22;


export interface SnowboardsFilters {
    priceFrom: number;
    priceTo: number;
    brands: string[];
    mountainTypes: string[];
    genders: string[];
    sizeFrom: number;
    sizeTo: number;
    stiffness: number;
}


function rangeToArray(from: number, to: number): string[] {
    const arr = [];
    for (let i = from; i <= to; i++) {
        arr.push(i.toString());
    }
    return arr;
}

const SnowboardsClient: React.FC<Props> = ({ initialProducts }) => {
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [isLoading, setIsLoading] = useState(false);

    const handleApplyFilters = useCallback(async (filters: SnowboardsFilters) => {
        setIsLoading(true);
        try {
            const brandIds = filters.brands
                .map((brandName: string) => BRAND_MAP[brandName])
                .filter((id: number | undefined): id is number => typeof id === 'number');

            const characteristics = [
                ...filters.mountainTypes.map((type: string) => ({ characteristicId: MOUNTAIN_TYPE_CHARACTERISTIC_ID, value: type })),
                ...filters.genders.map((gender: string) => ({ characteristicId: GENDER_CHARACTERISTIC_ID, value: gender })),
                ...rangeToArray(filters.sizeFrom, filters.sizeTo).map(length => ({ characteristicId: SIZE_CHARACTERISTIC_ID, value: length })),
                { characteristicId: STIFFNESS_CHARACTERISTIC_ID, value: String(filters.stiffness) },
            ];

            const filterBody = {
                categoryId: 10,
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
                <FilterSidebarSnowboards category="snowboards" onApplyFilters={handleApplyFilters} />
            </div>
            <div className={styles.productList}>
                {isLoading ? <p>Загрузка...</p> : <ProductList products={products} />}
            </div>
        </div>
    );
};

export default SnowboardsClient;
