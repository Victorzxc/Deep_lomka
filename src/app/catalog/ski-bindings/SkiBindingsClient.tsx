'use client';

import React, { useState, useCallback } from 'react';
import ProductList from '@/app/components/ProductList/ProductList';
import FilterSidebarSkiBindings from '@/app/catalog/ski-bindings/FilterSidebarSkiBindings';
import { filterProducts } from '@/app/utils/api';
import { Product } from '@/app/types/product';
import styles from './SkiBindingsPage.module.scss';

interface Props {
    initialProducts: Product[];
}

const BRAND_MAP: Record<string, number> = {
    Marker: 18,
    Look: 19,
};

export interface SkiBindingsFilters {
    priceFrom: number;
    priceTo: number;
    brands: string[];
    dinValues: string[];
    standards: string[];
    mountainTypes: string[];
}


const DIN_CHARACTERISTIC_ID = 5;
const STANDARD_CHARACTERISTIC_ID = 10;
const MOUNTAIN_TYPE_CHARACTERISTIC_ID = 9;

const SkiBindingsClient: React.FC<Props> = ({ initialProducts }) => {
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [isLoading, setIsLoading] = useState(false);

    const handleApplyFilters = useCallback(async (filters: SkiBindingsFilters) => {
        setIsLoading(true);
        try {
            const brandIds = filters.brands
                .map((brandName: string) => BRAND_MAP[brandName])
                .filter((id: number | undefined): id is number => typeof id === 'number');

            const characteristics = [
                ...filters.dinValues.map((value: string) => ({ characteristicId: DIN_CHARACTERISTIC_ID, value })),
                ...filters.standards.map((value: string) => ({ characteristicId: STANDARD_CHARACTERISTIC_ID, value })),
                ...filters.mountainTypes.map((value: string) => ({ characteristicId: MOUNTAIN_TYPE_CHARACTERISTIC_ID, value })),
            ];

            const filterBody = {
                categoryId: 7,
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
                <FilterSidebarSkiBindings category="ski-bindings" onApplyFilters={handleApplyFilters} />
            </div>
            <div className={styles.productList}>
                {isLoading ? <p>Загрузка...</p> : <ProductList products={products} />}
            </div>
        </div>
    );
};

export default SkiBindingsClient;
