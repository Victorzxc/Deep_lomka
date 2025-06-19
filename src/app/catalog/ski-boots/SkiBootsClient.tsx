'use client';

import React, { useState, useCallback } from 'react';
import ProductList from '@/app/components/ProductList/ProductList';
import FilterSidebarSkiBoots from './FilterSidebarSkiBoots';
import { filterProducts } from '@/app/utils/api';
import { Product } from '@/app/types/product';
import styles from './SkiBootsPage.module.scss';

interface Props {
    initialProducts: Product[];
}

const AGE_CHARACTERISTIC_ID = 15;
const GENDER_CHARACTERISTIC_ID = 8;
const PURPOSE_CHARACTERISTIC_ID = 26;
const CLIPS_COUNT_CHARACTERISTIC_ID = 27;
const SIZE_CHARACTERISTIC_ID = 16;
const STIFFNESS_CHARACTERISTIC_ID = 28;


export interface SkiBootsFilters {
    priceFrom: number;
    priceTo: number;
    brands: string[];
    ages?: string[];
    genders?: string[];
    skiBootPurpose?: string[];
    clipsCount?: string[];
    sizeFrom: number;
    sizeTo: number;
    stiffnessFrom: number;
    stiffnessTo: number;
}

const BRAND_MAP: Record<string, number> = {
    Dalbello: 22,
    Head: 7,
    K2: 11,
    Nordica: 20,
    Rossignol: 8,
};

function rangeToArrayStep(characteristicId: number, from: number, to: number, step: number): string[] {
    const arr = [];
    let val = from;

    while (val <= to) {
        let formattedValue: string;
        if (characteristicId === SIZE_CHARACTERISTIC_ID) {
            formattedValue = val.toFixed(1);
        } else {
            formattedValue = Math.round(val).toString();
        }
        arr.push(formattedValue);
        val = val + step;
        val = parseFloat(val.toFixed(2));
    }
    return arr;
}


const SkiBootsClient: React.FC<Props> = ({ initialProducts }) => {
    const [products, setProducts] = useState(initialProducts);
    const [isLoading, setIsLoading] = useState(false);

    const handleApplyFilters = useCallback(async (filters: SkiBootsFilters) => {
        setIsLoading(true);
        try {
            const brandIds = filters.brands
                ?.map((brand: string) => BRAND_MAP[brand])
                .filter(Boolean);

            const characteristics = [
                ...(filters.ages || []).map((age: string) => ({ characteristicId: AGE_CHARACTERISTIC_ID, value: age })),
                ...(filters.genders || []).map((gender: string) => ({ characteristicId: GENDER_CHARACTERISTIC_ID, value: gender })),
                ...(filters.skiBootPurpose || []).map((purpose: string) => ({ characteristicId: PURPOSE_CHARACTERISTIC_ID, value: purpose })),
                ...(filters.clipsCount || []).map((count: string) => ({ characteristicId: CLIPS_COUNT_CHARACTERISTIC_ID, value: count })),
                ...rangeToArrayStep(SIZE_CHARACTERISTIC_ID, filters.sizeFrom, filters.sizeTo, 0.5).map(size => ({ characteristicId: SIZE_CHARACTERISTIC_ID, value: size })),
                ...rangeToArrayStep(STIFFNESS_CHARACTERISTIC_ID, filters.stiffnessFrom, filters.stiffnessTo, 1).map(stiffness => ({ characteristicId: STIFFNESS_CHARACTERISTIC_ID, value: stiffness })),
            ];

            const filterBody = {
                categoryId: 6,
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
                <FilterSidebarSkiBoots category="ski-boots" onApplyFilters={handleApplyFilters} />
            </div>
            <div className={styles.productList}>
                {isLoading ? <p>Загрузка...</p> : <ProductList products={products} />}
            </div>
        </div>
    );
};

export default SkiBootsClient;
