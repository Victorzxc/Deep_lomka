'use client';

import React, { useState, useCallback } from 'react';
import ProductList from '@/app/components/ProductList/ProductList';
import FilterSidebarProtection from './FilterSidebarProtection';
import { filterProducts } from '@/app/utils/api';
import { Product } from '@/app/types/product';
import styles from './ProtectionPage.module.scss';

interface Props {
    initialProducts: Product[];
}

const SIZE_INT_CHARACTERISTIC_ID = 17;
const AGE_CHARACTERISTIC_ID = 18;
const GENDER_CHARACTERISTIC_ID = 8;

export interface ProtectionFilters {
    priceFrom: number;
    priceTo: number;
    brands: string[];
    ages: string[];
    genders: string[];
    sizeInt: string[];
}

const BRAND_MAP: Record<string, number> = {
    Briko: 14,
    POC: 15,
    UFO: 16,
};

const ProtectionClient: React.FC<Props> = ({ initialProducts }) => {
    const [products, setProducts] = useState(initialProducts);
    const [isLoading, setIsLoading] = useState(false);

    const handleApplyFilters = useCallback(async (filters: ProtectionFilters) => {
        setIsLoading(true);
        try {
            const characteristics: { characteristicId: number; value: string }[] = [];

            if (filters.sizeInt?.length) {
                characteristics.push(
                    ...filters.sizeInt.map((size: string) => ({
                        characteristicId: SIZE_INT_CHARACTERISTIC_ID,
                        value: size
                    }))
                );
            }

            if (filters.ages?.length) {
                characteristics.push(
                    ...filters.ages.map((age: string) => ({
                        characteristicId: AGE_CHARACTERISTIC_ID,
                        value: age
                    }))
                );
            }

            if (filters.genders?.length) {
                characteristics.push(
                    ...filters.genders.map((gender: string) => ({
                        characteristicId: GENDER_CHARACTERISTIC_ID,
                        value: gender
                    }))
                );
            }

            const filterBody = {
                categoryId: 8,
                brandIds: filters.brands
                    ?.map((brand: string) => BRAND_MAP[brand])
                    .filter(Boolean),
                minPrice: filters.priceFrom,
                maxPrice: filters.priceTo,
                characteristics
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
                <FilterSidebarProtection
                    category="protection"
                    onApplyFilters={handleApplyFilters}
                />
            </div>
            <div className={styles.productList}>
                {isLoading ? <p>Загрузка...</p> : <ProductList products={products} />}
            </div>
        </div>
    );
};

export default ProtectionClient;
