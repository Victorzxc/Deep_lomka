'use client';

import React, { useState, useCallback } from 'react';
import styles from '@/app/components/FilterSidebarStyles/FilterSidebar.module.scss';

import {
    toggleSelection,
    createPriceChangeHandler,
    MAX_PRICE,
} from '@/app/utils/filterHandlers';

interface FilterSidebarProps {
    category: string;
    onApplyFilters: (filters: {
        priceFrom: number;
        priceTo: number;
        brands: string[];
        dinValues: string[];
        standards: string[];
        mountainTypes: string[];
    }) => void;
}

const BRANDS = ['Look', 'Marker'];
const DIN_VALUES = [
    '3.5-11.0', '3.5-12.0', '6.0-16.0', '3.0-10.0', '4.0-12.0',
    '5.0-12.0', '4.0-13.0', '7.0-15.0', '5.0-14.0', '8.0-18.0',
    '2.0-7.0', '2.5-10.0',
];
const STANDARDS = ['GripWalk/Alpine', 'GripWalk', 'ISO 9523 Touring', 'ISO 5355 Alpine'];
const MOUNTAIN_TYPES = ['Фрирайд', 'Скитур', 'Олмаунтин'];

const FilterSidebarSkiBindings: React.FC<FilterSidebarProps> = ({ category, onApplyFilters }) => {
    const [priceFrom, setPriceFrom] = useState<number | ''>('');
    const [priceTo, setPriceTo] = useState<number | ''>('');
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedDin, setSelectedDin] = useState<string[]>([]);
    const [selectedStandards, setSelectedStandards] = useState<string[]>([]);
    const [selectedMountainTypes, setSelectedMountainTypes] = useState<string[]>([]);

    const handlePriceFromChange = useCallback(createPriceChangeHandler(setPriceFrom), [setPriceFrom]);
    const handlePriceToChange = useCallback(createPriceChangeHandler(setPriceTo), [setPriceTo]);

    
    const createBrandToggleHandler = useCallback(
        (brand: string) => () => toggleSelection(brand, selectedBrands, setSelectedBrands),
        [selectedBrands, setSelectedBrands]
    );

    const createDinToggleHandler = useCallback(
        (value: string) => () => toggleSelection(value, selectedDin, setSelectedDin),
        [selectedDin, setSelectedDin]
    );

    const createStandardToggleHandler = useCallback(
        (value: string) => () => toggleSelection(value, selectedStandards, setSelectedStandards),
        [selectedStandards, setSelectedStandards]
    );

    const createMountainTypeToggleHandler = useCallback(
        (type: string) => () => toggleSelection(type, selectedMountainTypes, setSelectedMountainTypes),
        [selectedMountainTypes, setSelectedMountainTypes]
    );

    const applyFilters = useCallback(() => {
        onApplyFilters({
            priceFrom: priceFrom === '' ? 0 : priceFrom,
            priceTo: priceTo === '' ? 0 : priceTo,
            brands: selectedBrands,
            dinValues: selectedDin,
            standards: selectedStandards,
            mountainTypes: selectedMountainTypes,
        });
    }, [priceFrom, priceTo, selectedBrands, selectedDin, selectedStandards, selectedMountainTypes, onApplyFilters]);

    const resetFilters = useCallback(() => {
        setPriceFrom('');
        setPriceTo('');
        setSelectedBrands([]);
        setSelectedDin([]);
        setSelectedStandards([]);
        setSelectedMountainTypes([]);
        onApplyFilters({
            priceFrom: 0,
            priceTo: 0,
            brands: [],
            dinValues: [],
            standards: [],
            mountainTypes: [],
        });
    }, [onApplyFilters]);

    if (category !== 'ski-bindings') return null;

    return (
        <div className={styles.filterSidebar}>
            <h2>Фильтры</h2>

            <div className={styles.filterGroup}>
                <h3>Цена</h3>
                <input type="number" placeholder="От" value={priceFrom} onChange={handlePriceFromChange} max={MAX_PRICE} />
                <input type="number" placeholder="До" value={priceTo} onChange={handlePriceToChange} max={MAX_PRICE} />
            </div>

            <div className={styles.filterGroup}>
                <h3>Бренд</h3>
                {BRANDS.map(brand => (
                    <label key={brand}>
                        <input type="checkbox" checked={selectedBrands.includes(brand)} onChange={createBrandToggleHandler(brand)} />
                        {brand}
                    </label>
                ))}
            </div>

            <div className={styles.filterGroup}>
                <h3>Усилие срабатывания, DIN</h3>
                {DIN_VALUES.map(value => (
                    <label key={value}>
                        <input type="checkbox" checked={selectedDin.includes(value)} onChange={createDinToggleHandler(value)} />
                        {value}
                    </label>
                ))}
            </div>

            <div className={styles.filterGroup}>
                <h3>Стандарт</h3>
                {STANDARDS.map(value => (
                    <label key={value}>
                        <input type="checkbox" checked={selectedStandards.includes(value)} onChange={createStandardToggleHandler(value)} />
                        {value}
                    </label>
                ))}
            </div>

            <div className={styles.filterGroup}>
                <h3>Назначение креплений</h3>
                {MOUNTAIN_TYPES.map(type => (
                    <label key={type}>
                        <input type="checkbox" checked={selectedMountainTypes.includes(type)} onChange={createMountainTypeToggleHandler(type)} />
                        {type}
                    </label>
                ))}
            </div>

            <button className={styles.filtrBtn} onClick={applyFilters}>Показать</button>
            <button className={styles.filtrBtn} onClick={resetFilters}>Сбросить</button>
        </div>
    );
};

export default FilterSidebarSkiBindings;
