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

const PROTECTION_TYPE_CHARACTERISTIC_ID = 19;
const SIZE_INT_CHARACTERISTIC_ID = 17;
const HELMET_SIZE_CHARACTERISTIC_ID = 20;
const AGE_CHARACTERISTIC_ID = 18;
const GENDER_CHARACTERISTIC_ID = 8;


export interface ProtectionFilters {
    priceFrom: number;
    priceTo: number;
    protectionTypes: string[];
    brands: string[];
    ages: string[];
    genders: string[];
    sizeInt: string[];
    helmetSizeFrom?: number;
    helmetSizeTo?: number;
}


const BRAND_MAP: Record<string, number> = {
    Briko: 14,
    POC: 15,
    UFO: 16,
    K2: 11,
    Rossignol: 8
};

const ProtectionClient: React.FC<Props> = ({ initialProducts }) => {
    const [products, setProducts] = useState(initialProducts);
    const [isLoading, setIsLoading] = useState(false);

    const handleApplyFilters = useCallback(async (filters: ProtectionFilters) => {
        setIsLoading(true);
        try {
            const characteristics: { characteristicId: number; value: string }[] = [];

            if (filters.protectionTypes?.length) {
                characteristics.push(
                    ...filters.protectionTypes.map((type: string) => ({
                        characteristicId: PROTECTION_TYPE_CHARACTERISTIC_ID,
                        value: type
                    }))
                );
            }

            if (filters.sizeInt?.length) {
                characteristics.push(
                    ...filters.sizeInt.map((size: string) => ({
                        characteristicId: SIZE_INT_CHARACTERISTIC_ID,
                        value: size
                    }))
                );
            }

            if (
                filters.helmetSizeFrom !== undefined &&
                filters.helmetSizeTo !== undefined
            ) {
                characteristics.push({
                    characteristicId: HELMET_SIZE_CHARACTERISTIC_ID,
                    value: `${filters.helmetSizeFrom}-${filters.helmetSizeTo}`
                });
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
