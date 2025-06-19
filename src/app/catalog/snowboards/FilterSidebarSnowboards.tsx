'use client';

import React, { useState, useCallback } from 'react';
import { Range } from 'react-range';
import styles from '@/app/components/FilterSidebarStyles/FilterSidebar.module.scss';

import {
  createPriceChangeHandler,
  createToggleHandler,
  MAX_PRICE,
} from '@/app/utils/filterHandlers';

const MIN_SIZE = 90;
const MAX_SIZE = 203;

const MIN_STIFFNESS = 1;
const MAX_STIFFNESS = 10;

const BRANDS = ['Rossignol', 'Burton', 'K2', 'Ride'];
const MOUNTAIN_TYPES = ['Олмаунтин', 'Парк', 'Фрирайд'];
const GENDERS = ['Женский', 'Унисекс'];

interface FilterSidebarProps {
  category: string;
  onApplyFilters: (filters: {
    priceFrom: number;
    priceTo: number;
    sizeFrom: number;
    sizeTo: number;
    stiffness: number;
    brands: string[];
    mountainTypes: string[];
    genders: string[];
  }) => void;
}

const FilterSidebarSnowboards: React.FC<FilterSidebarProps> = ({ category, onApplyFilters }) => {
  const [priceFrom, setPriceFrom] = useState<number | ''>('');
  const [priceTo, setPriceTo] = useState<number | ''>('');
  const [sizeRange, setSizeRange] = useState<number[]>([MIN_SIZE, MAX_SIZE]);
  const [stiffness, setStiffness] = useState<number>(MIN_STIFFNESS);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedMountainTypes, setSelectedMountainTypes] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);

  const handlePriceFromChange = useCallback(createPriceChangeHandler(setPriceFrom), [setPriceFrom]);
  const handlePriceToChange = useCallback(createPriceChangeHandler(setPriceTo), [setPriceTo]);

  const handleSizeRangeChange = useCallback((values: number[]) => setSizeRange(values), []);
  const handleStiffnessChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setStiffness(Number(e.target.value)), []);


  const handleBrandToggle = useCallback(
    (brand: string) => createToggleHandler(brand, selectedBrands, setSelectedBrands),
    [selectedBrands, setSelectedBrands]
  );

  const handleMountainTypeToggle = useCallback(
    (type: string) => createToggleHandler(type, selectedMountainTypes, setSelectedMountainTypes),
    [selectedMountainTypes, setSelectedMountainTypes]
  );

  const handleGenderToggle = useCallback(
    (gender: string) => createToggleHandler(gender, selectedGenders, setSelectedGenders),
    [selectedGenders, setSelectedGenders]
  );

  const applyFilters = useCallback(() => {
    onApplyFilters({
      priceFrom: priceFrom === '' ? 0 : priceFrom,
      priceTo: priceTo === '' ? 0 : priceTo,
      sizeFrom: sizeRange[0],
      sizeTo: sizeRange[1],
      stiffness,
      brands: selectedBrands,
      mountainTypes: selectedMountainTypes,
      genders: selectedGenders,
    });
  }, [priceFrom, priceTo, sizeRange, stiffness, selectedBrands, selectedMountainTypes, selectedGenders, onApplyFilters]);

  const resetFilters = useCallback(() => {
    setPriceFrom('');
    setPriceTo('');
    setSizeRange([MIN_SIZE, MAX_SIZE]);
    setStiffness(MIN_STIFFNESS);
    setSelectedBrands([]);
    setSelectedMountainTypes([]);
    setSelectedGenders([]);
    onApplyFilters({
      priceFrom: 0,
      priceTo: 0,
      sizeFrom: MIN_SIZE,
      sizeTo: MAX_SIZE,
      stiffness: MIN_STIFFNESS,
      brands: [],
      mountainTypes: [],
      genders: [],
    });
  }, [onApplyFilters]);

  if (category !== 'snowboards') return null;

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
        <h3>Жёсткость</h3>
        <input
          className={styles.inputRigidity}
          type="range"
          min={MIN_STIFFNESS}
          max={MAX_STIFFNESS}
          value={stiffness}
          onChange={handleStiffnessChange}
        />
        <div>Выбрано: {stiffness}</div>
      </div>

      <div className={styles.filterGroup}>
        <h3>Бренд</h3>
        {BRANDS.map(brand => (
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
        <h3>Назначение</h3>
        {MOUNTAIN_TYPES.map(type => (
          <label key={type}>
            <input
              type="checkbox"
              checked={selectedMountainTypes.includes(type)}
              onChange={handleMountainTypeToggle(type)}
            />
            {type}
          </label>
        ))}
      </div>

      <div className={styles.filterGroup}>
        <h3>Пол</h3>
        {GENDERS.map(gender => (
          <label key={gender}>
            <input
              type="checkbox"
              checked={selectedGenders.includes(gender)}
              onChange={handleGenderToggle(gender)}
            />
            {gender}
          </label>
        ))}
      </div>

      <button className={styles.filtrBtn} onClick={applyFilters}>Показать</button>
      <button className={styles.filtrBtn} onClick={resetFilters}>Сбросить</button>
    </div>
  );
};

export default FilterSidebarSnowboards;
