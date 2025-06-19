import React from 'react';

export const MAX_PRICE = 9999999;

/**
 * toggleSelection для массивов выбранных значений
 */
export function toggleSelection(
  value: string,
  selected: string[],
  setSelected: React.Dispatch<React.SetStateAction<string[]>>
) {
  if (selected.includes(value)) {
    setSelected(selected.filter(v => v !== value));
  } else {
    setSelected([...selected, value]);
  }
}

/**
 * Фабрика обработчика toggle для onChange чекбоксов
 */
export function createToggleHandler(
  value: string,
  selected: string[],
  setSelected: React.Dispatch<React.SetStateAction<string[]>>
) {
  return () => toggleSelection(value, selected, setSelected);
}

/**
 * Обработчик изменения цены с ограничением по MAX_PRICE
 */
export function createPriceChangeHandler(
  setPrice: React.Dispatch<React.SetStateAction<number | ''>>
) {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value === '' ? '' : Number(e.target.value);
    if (val === '' || (val >= 0 && val <= MAX_PRICE)) {
      setPrice(val);
    }
  };
}

/**
 * Обработчик изменения диапазона
 */
export function createRangeChangeHandler(
  setRange: React.Dispatch<React.SetStateAction<number[]>>
) {
  return (values: number[]) => {
    setRange(values);
  };
}

/**
 * Обработчик изменения значения
 */
export function createInputRangeChangeHandler(
  setValue: React.Dispatch<React.SetStateAction<number>>
) {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  };
}
