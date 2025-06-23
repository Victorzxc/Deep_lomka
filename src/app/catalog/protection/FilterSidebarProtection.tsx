'use client';

import React, { useState, useCallback } from 'react';
import styles from '@/app/components/FilterSidebarStyles/FilterSidebar.module.scss';

import {
    createPriceChangeHandler,
    createToggleHandler,
    MAX_PRICE,
} from '@/app/utils/filterHandlers';

const BRANDS = ['Briko', 'POC', 'UFO'];
const AGE_GROUPS = ['Для детей', 'Для взрослых', 'Для подростков'];
const GENDERS = ['Женский', 'Унисекс'];
const SIZE_INT = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];

interface FilterSidebarProps {
    category: string;
    onApplyFilters: (filters: {
        priceFrom: number;
        priceTo: number;
        brands: string[];
        ages: string[];
        genders: string[];
        sizeInt: string[];
    }) => void;
}

const FilterSidebarProtection: React.FC<FilterSidebarProps> = ({ category, onApplyFilters }) => {
    const [priceFrom, setPriceFrom] = useState<number | ''>('');
    const [priceTo, setPriceTo] = useState<number | ''>('');
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedAges, setSelectedAges] = useState<string[]>([]);
    const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
    const [selectedSizeInt, setSelectedSizeInt] = useState<string[]>([]);

    const handlePriceFromChange = useCallback(createPriceChangeHandler(setPriceFrom), [setPriceFrom]);
    const handlePriceToChange = useCallback(createPriceChangeHandler(setPriceTo), [setPriceTo]);

    const handleBrandToggle = useCallback(
        (brand: string) => createToggleHandler(brand, selectedBrands, setSelectedBrands),
        [selectedBrands, setSelectedBrands]
    );

    const handleAgeToggle = useCallback(
        (age: string) => createToggleHandler(age, selectedAges, setSelectedAges),
        [selectedAges, setSelectedAges]
    );

    const handleGenderToggle = useCallback(
        (gender: string) => createToggleHandler(gender, selectedGenders, setSelectedGenders),
        [selectedGenders, setSelectedGenders]
    );

    const handleSizeIntToggle = useCallback(
        (size: string) => createToggleHandler(size, selectedSizeInt, setSelectedSizeInt),
        [selectedSizeInt, setSelectedSizeInt]
    );

    const applyFilters = useCallback(() => {
        onApplyFilters({
            priceFrom: priceFrom || 0,
            priceTo: priceTo || 0,
            brands: selectedBrands,
            ages: selectedAges,
            genders: selectedGenders,
            sizeInt: selectedSizeInt,
        });
    }, [
        priceFrom,
        priceTo,
        selectedBrands,
        selectedAges,
        selectedGenders,
        selectedSizeInt,
        onApplyFilters,
    ]);

    const resetFilters = useCallback(() => {
        setPriceFrom('');
        setPriceTo('');
        setSelectedBrands([]);
        setSelectedAges([]);
        setSelectedGenders([]);
        setSelectedSizeInt([]);
        onApplyFilters({
            priceFrom: 0,
            priceTo: 0,
            brands: [],
            ages: [],
            genders: [],
            sizeInt: [],
        });
    }, [onApplyFilters]);

    if (category !== 'protection') return null;

    return (
        <div className={styles.filterSidebar}>
            <h2>Фильтры</h2>

            <div className={styles.filterGroup}>
                <h3>Цена</h3>
                <input type="number" placeholder="От" value={priceFrom} onChange={handlePriceFromChange} max={MAX_PRICE} />
                <input type="number" placeholder="До" value={priceTo} onChange={handlePriceToChange} max={MAX_PRICE} />
            </div>

            <div className={styles.filterGroup}>
                <h3>Размеры (INT)</h3>
                {SIZE_INT.map((size) => (
                    <label key={size}>
                        <input type="checkbox" checked={selectedSizeInt.includes(size)} onChange={handleSizeIntToggle(size)} />
                        {size}
                    </label>
                ))}
            </div>

            <div className={styles.filterGroup}>
                <h3>Бренд</h3>
                {BRANDS.map((brand) => (
                    <label key={brand}>
                        <input type="checkbox" checked={selectedBrands.includes(brand)} onChange={handleBrandToggle(brand)} />
                        {brand}
                    </label>
                ))}
            </div>

            <div className={styles.filterGroup}>
                <h3>Возраст</h3>
                {AGE_GROUPS.map((age) => (
                    <label key={age}>
                        <input type="checkbox" checked={selectedAges.includes(age)} onChange={handleAgeToggle(age)} />
                        {age}
                    </label>
                ))}
            </div>

            <div className={styles.filterGroup}>
                <h3>Пол</h3>
                {GENDERS.map((gender) => (
                    <label key={gender}>
                        <input type="checkbox" checked={selectedGenders.includes(gender)} onChange={handleGenderToggle(gender)} />
                        {gender}
                    </label>
                ))}
            </div>

            <button className={styles.filtrBtn} onClick={applyFilters}>Показать</button>
            <button className={styles.filtrBtn} onClick={resetFilters}>Сбросить</button>
        </div>
    );
};

export default FilterSidebarProtection;
