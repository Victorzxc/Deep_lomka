'use client';

import React, { useState, useCallback } from 'react';
import { Range } from 'react-range';
import styles from '@/app/components/FilterSidebarStyles/FilterSidebar.module.scss';

import {
    createPriceChangeHandler,
    createToggleHandler,
    MAX_PRICE,
} from '@/app/utils/filterHandlers';

const PROTECTION_TYPES = ['Защита спины', 'Защита головы', 'Защита бёдер'];
const BRANDS = ['Briko', 'POC', 'UFO', 'K2', 'Rossignol'];
const AGE_GROUPS = ['Для детей', 'Для взрослых', 'Для подростков'];
const GENDERS = ['Женский', 'Унисекс'];
const SIZE_INT = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];
const MIN_HELMET_SIZE = 48;
const MAX_HELMET_SIZE = 67;

interface FilterSidebarProps {
    category: string;
    onApplyFilters: (filters: {
        priceFrom: number;
        priceTo: number;
        protectionTypes: string[];
        brands: string[];
        ages: string[];
        genders: string[];
        sizeInt: string[];
        helmetSizeFrom?: number;
        helmetSizeTo?: number;
    }) => void;
}

const FilterSidebarProtection: React.FC<FilterSidebarProps> = ({ category, onApplyFilters }) => {
    const [priceFrom, setPriceFrom] = useState<number | ''>('');
    const [priceTo, setPriceTo] = useState<number | ''>('');
    const [selectedProtectionTypes, setSelectedProtectionTypes] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedAges, setSelectedAges] = useState<string[]>([]);
    const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
    const [selectedSizeInt, setSelectedSizeInt] = useState<string[]>([]);
    const [helmetSizeRange, setHelmetSizeRange] = useState<number[]>([MIN_HELMET_SIZE, MAX_HELMET_SIZE]);

    const isHelmetSizeDisabled = selectedSizeInt.length > 0;

    const handlePriceFromChange = useCallback(createPriceChangeHandler(setPriceFrom), [setPriceFrom]);
    const handlePriceToChange = useCallback(createPriceChangeHandler(setPriceTo), [setPriceTo]);

    const handleHelmetSizeChange = useCallback(
        (values: number[]) => {
            if (!isHelmetSizeDisabled) {
                setHelmetSizeRange(values);
            }
        },
        [isHelmetSizeDisabled]
    );


    const handleProtectionTypeToggle = useCallback(
        (type: string) => createToggleHandler(type, selectedProtectionTypes, setSelectedProtectionTypes),
        [selectedProtectionTypes, setSelectedProtectionTypes]
    );

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
            protectionTypes: selectedProtectionTypes,
            brands: selectedBrands,
            ages: selectedAges,
            genders: selectedGenders,
            sizeInt: selectedSizeInt,
            ...(isHelmetSizeDisabled
                ? {}
                : {
                    helmetSizeFrom: helmetSizeRange[0],
                    helmetSizeTo: helmetSizeRange[1],
                }),
        });
    }, [
        priceFrom,
        priceTo,
        selectedProtectionTypes,
        selectedBrands,
        selectedAges,
        selectedGenders,
        selectedSizeInt,
        helmetSizeRange,
        isHelmetSizeDisabled,
        onApplyFilters,
    ]);

    const resetFilters = useCallback(() => {
        setPriceFrom('');
        setPriceTo('');
        setSelectedProtectionTypes([]);
        setSelectedBrands([]);
        setSelectedAges([]);
        setSelectedGenders([]);
        setSelectedSizeInt([]);
        setHelmetSizeRange([MIN_HELMET_SIZE, MAX_HELMET_SIZE]);
        onApplyFilters({
            priceFrom: 0,
            priceTo: 0,
            protectionTypes: [],
            brands: [],
            ages: [],
            genders: [],
            sizeInt: [],
            helmetSizeFrom: MIN_HELMET_SIZE,
            helmetSizeTo: MAX_HELMET_SIZE,
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

            <div
                className={styles.filterGroup}
                style={{
                    opacity: isHelmetSizeDisabled ? 0.5 : 1,
                    pointerEvents: isHelmetSizeDisabled ? 'none' : 'auto',
                }}
            >
                <h3>Размер шлема (см)</h3>
                <Range
                    step={1}
                    min={MIN_HELMET_SIZE}
                    max={MAX_HELMET_SIZE}
                    values={helmetSizeRange}
                    onChange={handleHelmetSizeChange}
                    renderTrack={({ props, children }) => <div {...props} className={styles.rangeTrack}>{children}</div>}
                    renderThumb={({ props, index }) => <div {...props} key={index} className={styles.rangeThumb} />}
                />
                <div>
                    Выбрано: {helmetSizeRange[0]} см — {helmetSizeRange[1]} см
                </div>
            </div>

            <div className={styles.filterGroup}>
                <h3>Защита частей тела</h3>
                {PROTECTION_TYPES.map((type) => (
                    <label key={type}>
                        <input type="checkbox" checked={selectedProtectionTypes.includes(type)} onChange={handleProtectionTypeToggle(type)} />
                        {type}
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
