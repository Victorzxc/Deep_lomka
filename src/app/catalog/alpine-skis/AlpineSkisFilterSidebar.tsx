'use client';

import React, { useState, useCallback } from 'react';
import { Range } from 'react-range';
import styles from '@/app/components/FilterSidebarStyles/FilterSidebar.module.scss';

import {
    toggleSelection,
    createPriceChangeHandler,
    createRangeChangeHandler,
    MAX_PRICE,
} from '@/app/utils/filterHandlers';

const MIN_SIZE = 88;
const MAX_SIZE = 194;

const MIN_WAIST = 60;
const MAX_WAIST = 140;

const BRANDS = ['Head', 'Rossignol', 'Salomon', 'K2', 'Atomic', 'Fisher', 'Nordica'];
const MOUNTAIN_TYPES = ['Олмаунтин', 'Универсальные', 'Фрирайд'];
const GENDERS = ['Женский', 'Унисекс'];

interface FilterSidebarProps {
    category: string;
    onApplyFilters: (filters: {
        priceFrom: number;
        priceTo: number;
        sizeFrom: number;
        sizeTo: number;
        waistFrom: number;
        waistTo: number;
        brands: string[];
        mountainTypes: string[];
        genders: string[];
    }) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ category, onApplyFilters }) => {
    const [priceFrom, setPriceFrom] = useState<number | ''>('');
    const [priceTo, setPriceTo] = useState<number | ''>('');
    const [sizeRange, setSizeRange] = useState<number[]>([MIN_SIZE, MAX_SIZE]);
    const [waistRange, setWaistRange] = useState<number[]>([MIN_WAIST, MAX_WAIST]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedMountainTypes, setSelectedMountainTypes] = useState<string[]>([]);
    const [selectedGenders, setSelectedGenders] = useState<string[]>([]);

    const handlePriceFromChange = useCallback(createPriceChangeHandler(setPriceFrom), [setPriceFrom]);
    const handlePriceToChange = useCallback(createPriceChangeHandler(setPriceTo), [setPriceTo]);

    const handleSizeRangeChange = useCallback(createRangeChangeHandler(setSizeRange), [setSizeRange]);
    const handleWaistRangeChange = useCallback(createRangeChangeHandler(setWaistRange), [setWaistRange]);

    function createCheckboxToggleHandler(
        value: string,
        selected: string[],
        setSelected: React.Dispatch<React.SetStateAction<string[]>>
    ) {
        return () => {
            toggleSelection(value, selected, setSelected);
        };
    }

    const handleBrandToggle = useCallback(
        (brand: string) => createCheckboxToggleHandler(brand, selectedBrands, setSelectedBrands),
        [selectedBrands, setSelectedBrands]
    );

    const handleMountainTypeToggle = useCallback(
        (type: string) => createCheckboxToggleHandler(type, selectedMountainTypes, setSelectedMountainTypes),
        [selectedMountainTypes, setSelectedMountainTypes]
    );

    const handleGenderToggle = useCallback(
        (gender: string) => createCheckboxToggleHandler(gender, selectedGenders, setSelectedGenders),
        [selectedGenders, setSelectedGenders]
    );

    const applyFilters = useCallback(() => {
        onApplyFilters({
            priceFrom: priceFrom === '' ? 0 : priceFrom,
            priceTo: priceTo === '' ? 0 : priceTo,
            sizeFrom: sizeRange[0],
            sizeTo: sizeRange[1],
            waistFrom: waistRange[0],
            waistTo: waistRange[1],
            brands: selectedBrands,
            mountainTypes: selectedMountainTypes,
            genders: selectedGenders,
        });
    }, [
        priceFrom,
        priceTo,
        sizeRange,
        waistRange,
        selectedBrands,
        selectedMountainTypes,
        selectedGenders,
        onApplyFilters,
    ]);

    const resetFilters = useCallback(() => {
        setPriceFrom('');
        setPriceTo('');
        setSizeRange([MIN_SIZE, MAX_SIZE]);
        setWaistRange([MIN_WAIST, MAX_WAIST]);
        setSelectedBrands([]);
        setSelectedMountainTypes([]);
        setSelectedGenders([]);
        onApplyFilters({
            priceFrom: 0,
            priceTo: 0,
            sizeFrom: MIN_SIZE,
            sizeTo: MAX_SIZE,
            waistFrom: MIN_WAIST,
            waistTo: MAX_WAIST,
            brands: [],
            mountainTypes: [],
            genders: [],
        });
    }, [onApplyFilters]);

    if (category !== 'alpine-skis') return null;

    return (
        <div className={styles.filterSidebar}>
            <h2>Фильтры</h2>

            <div className={styles.filterGroup}>
                <h3>Цена</h3>
                <input type="number" placeholder="От" value={priceFrom} onChange={handlePriceFromChange} max={MAX_PRICE} />
                <input type="number" placeholder="До" value={priceTo} onChange={handlePriceToChange} max={MAX_PRICE} />
            </div>

            <div className={styles.filterGroup}>
                <h3>Ростовка (см)</h3>
                <Range
                    step={1}
                    min={MIN_SIZE}
                    max={MAX_SIZE}
                    values={sizeRange}
                    onChange={handleSizeRangeChange}
                    renderTrack={({ props, children }) => <div {...props} className={styles.rangeTrack}>{children}</div>}
                    renderThumb={({ props, index }) => <div {...props} key={index} className={styles.rangeThumb} />}
                />
                <div>Выбрано: {sizeRange[0]} см — {sizeRange[1]} см</div>
            </div>

            <div className={styles.filterGroup}>
                <h3>Ширина талии мм</h3>
                <Range
                    step={1}
                    min={MIN_WAIST}
                    max={MAX_WAIST}
                    values={waistRange}
                    onChange={handleWaistRangeChange}
                    renderTrack={({ props, children }) => <div {...props} className={styles.rangeTrack}>{children}</div>}
                    renderThumb={({ props, index }) => <div {...props} key={index} className={styles.rangeThumb} />}
                />
                <div>Выбрано: {waistRange[0]} мм — {waistRange[1]} мм</div>
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
                <h3>Назначение</h3>
                {MOUNTAIN_TYPES.map((type) => (
                    <label key={type}>
                        <input type="checkbox" checked={selectedMountainTypes.includes(type)} onChange={handleMountainTypeToggle(type)} />
                        {type}
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

export default FilterSidebar;
