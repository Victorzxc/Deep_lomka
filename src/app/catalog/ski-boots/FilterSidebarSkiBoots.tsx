'use client';

import React, { useState, useCallback } from 'react';
import { Range } from 'react-range';
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
        sizeFrom: number;
        sizeTo: number;
        stiffnessFrom: number;
        stiffnessTo: number;
        brands: string[];
        ages: string[];
        genders: string[];
        skiBootPurpose: string[];
        clipsCount: string[];
    }) => void;
}

const BRANDS = ['Dalbello', 'Head', 'K2', 'Nordica', 'Rossignol'];
const AGE_GROUPS = ['Для детей', 'Для подростков', 'Для взрослых'];
const GENDERS = ['Для женщин', 'Для мужчин', 'Унисекс'];
const SKI_BOOT_PURPOSE = ['Олмаунтин', 'Скитур', 'Парк', 'Трасса', 'Фрирайд'];
const CLIPS_COUNT = ['1', '2', '3', '4'];
const MIN_SIZE = 26.5;
const MAX_SIZE = 47.5;
const MIN_STIFFNESS = 20;
const MAX_STIFFNESS = 150;

const FilterSidebarSkiBoots: React.FC<FilterSidebarProps> = ({ category, onApplyFilters }) => {
    const [priceFrom, setPriceFrom] = useState<number | ''>('');
    const [priceTo, setPriceTo] = useState<number | ''>('');
    const [sizeRange, setSizeRange] = useState<number[]>([MIN_SIZE, MAX_SIZE]);
    const [stiffnessRange, setStiffnessRange] = useState<number[]>([MIN_STIFFNESS, MAX_STIFFNESS]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedAges, setSelectedAges] = useState<string[]>([]);
    const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
    const [selectedSkiBootPurpose, setSelectedSkiBootPurpose] = useState<string[]>([]);
    const [selectedClipsCount, setSelectedClipsCount] = useState<string[]>([]);

    const handlePriceFromChange = useCallback(createPriceChangeHandler(setPriceFrom), [setPriceFrom]);
    const handlePriceToChange = useCallback(createPriceChangeHandler(setPriceTo), [setPriceTo]);

    const handleSizeRangeChange = useCallback((values: number[]) => setSizeRange(values), []);
    const handleStiffnessRangeChange = useCallback((values: number[]) => setStiffnessRange(values), []);


    const createToggleHandler = (
        value: string,
        selected: string[],
        setSelected: React.Dispatch<React.SetStateAction<string[]>>
    ) => () => {
        toggleSelection(value, selected, setSelected);
    };



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

    const handlePurposeToggle = useCallback(
        (purpose: string) => createToggleHandler(purpose, selectedSkiBootPurpose, setSelectedSkiBootPurpose),
        [selectedSkiBootPurpose, setSelectedSkiBootPurpose]
    );

    const handleClipsCountToggle = useCallback(
        (count: string) => createToggleHandler(count, selectedClipsCount, setSelectedClipsCount),
        [selectedClipsCount, setSelectedClipsCount]
    );

    const applyFilters = useCallback(() => {
        onApplyFilters({
            priceFrom: priceFrom || 0,
            priceTo: priceTo || 0,
            sizeFrom: sizeRange[0],
            sizeTo: sizeRange[1],
            stiffnessFrom: stiffnessRange[0],
            stiffnessTo: stiffnessRange[1],
            brands: selectedBrands,
            ages: selectedAges,
            genders: selectedGenders,
            skiBootPurpose: selectedSkiBootPurpose,
            clipsCount: selectedClipsCount,
        });
    }, [
        priceFrom,
        priceTo,
        sizeRange,
        stiffnessRange,
        selectedBrands,
        selectedAges,
        selectedGenders,
        selectedSkiBootPurpose,
        selectedClipsCount,
        onApplyFilters,
    ]);

    const resetFilters = useCallback(() => {
        setPriceFrom('');
        setPriceTo('');
        setSizeRange([MIN_SIZE, MAX_SIZE]);
        setStiffnessRange([MIN_STIFFNESS, MAX_STIFFNESS]);
        setSelectedBrands([]);
        setSelectedAges([]);
        setSelectedGenders([]);
        setSelectedSkiBootPurpose([]);
        setSelectedClipsCount([]);
        onApplyFilters({
            priceFrom: 0,
            priceTo: 0,
            sizeFrom: MIN_SIZE,
            sizeTo: MAX_SIZE,
            stiffnessFrom: MIN_STIFFNESS,
            stiffnessTo: MAX_STIFFNESS,
            brands: [],
            ages: [],
            genders: [],
            skiBootPurpose: [],
            clipsCount: [],
        });
    }, [onApplyFilters]);

    if (category !== 'ski-boots') return null;

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
                {BRANDS.map((brand) => (
                    <label key={brand}>
                        <input
                            type="checkbox"
                            checked={selectedBrands.includes(brand)}
                            onChange={handleBrandToggle(brand)}
                        />
                        {brand}
                    </label>
                ))}
            </div>

            <div className={styles.filterGroup}>
                <h3>Размеры (EU)</h3>
                <Range
                    step={0.5}
                    min={MIN_SIZE}
                    max={MAX_SIZE}
                    values={sizeRange}
                    onChange={handleSizeRangeChange}
                    renderTrack={({ props, children }) => <div {...props} className={styles.rangeTrack}>{children}</div>}
                    renderThumb={({ props, index }) => <div {...props} key={index} className={styles.rangeThumb} />}
                />
                <div>
                    Выбрано: {sizeRange[0]} — {sizeRange[1]}
                </div>
            </div>

            <div className={styles.filterGroup}>
                <h3>Жесткость горнолыжных ботинок</h3>
                <Range
                    step={1}
                    min={MIN_STIFFNESS}
                    max={MAX_STIFFNESS}
                    values={stiffnessRange}
                    onChange={handleStiffnessRangeChange}
                    renderTrack={({ props, children }) => <div {...props} className={styles.rangeTrack}>{children}</div>}
                    renderThumb={({ props, index }) => <div {...props} key={index} className={styles.rangeThumb} />}
                />
                <div>
                    Выбрано: {stiffnessRange[0]} — {stiffnessRange[1]}
                </div>
            </div>

            <div className={styles.filterGroup}>
                <h3>Возраст</h3>
                {AGE_GROUPS.map((age) => (
                    <label key={age}>
                        <input
                            type="checkbox"
                            checked={selectedAges.includes(age)}
                            onChange={handleAgeToggle(age)} />
                        {age}
                    </label>
                ))}
            </div>

            <div className={styles.filterGroup}>
                <h3>Назначение горнолыжных ботинок</h3>
                {SKI_BOOT_PURPOSE.map((purpose) => (
                    <label key={purpose}>
                        <input
                            type="checkbox"
                            checked={selectedSkiBootPurpose.includes(purpose)}
                            onChange={handlePurposeToggle(purpose)} />
                        {purpose}
                    </label>
                ))}
            </div>

            <div className={styles.filterGroup}>
                <h3>Количество клипс</h3>
                {CLIPS_COUNT.map((count) => (
                    <label key={count}>
                        <input type="checkbox"
                            checked={selectedClipsCount.includes(count)}
                            onChange={handleClipsCountToggle(count)} />
                        {count}
                    </label>
                ))}
            </div>

            <div className={styles.filterGroup}>
                <h3>Пол</h3>
                {GENDERS.map((gender) => (
                    <label key={gender}>
                        <input
                            type="checkbox"
                            checked={selectedGenders.includes(gender)}
                            onChange={handleGenderToggle(gender)} />
                        {gender}
                    </label>
                ))}
            </div>

            <button className={styles.filtrBtn} onClick={applyFilters}>
                Показать
            </button>
            <button className={styles.filtrBtn} onClick={resetFilters}>
                Сбросить
            </button>
        </div>
    );
};

export default FilterSidebarSkiBoots;
