import React from 'react';
import styles from './FilterSidebar.module.scss';

interface FilterSidebarProps {
    category: string;
  }
const FilterSidebar: React.FC<FilterSidebarProps> = ({category}) => {
    return (
        <div className={styles.filterSidebar}>
            <h2>Фильтры</h2>
            {category === "alpine-skis" && (
            <>
            <div className={styles.filterGroup}>
                <h3>Цена</h3>
                
            </div>
            <div className={styles.filterGroup}>
                <h3>Размеры</h3>
                
            </div>
            <div className={styles.filterGroup}>
                <h3>Бренд</h3>
                
            </div>
            <div className={styles.filterGroup}>
                <h3>Ширина талии мм</h3>
                
            </div>
            <div className={styles.filterGroup}>
                <h3>Пол</h3>
                
            </div>
            </>
            )}
            {category === "ski-bindings" && (
            <>
            <div className={styles.filterGroup}>
                <h3>Цена</h3>
            </div>
            <div className={styles.filterGroup}>
                <h3>Размеры</h3>
            </div>
            <div className={styles.filterGroup}>
                <h3>Бренд</h3>
            </div>
            <div className={styles.filterGroup}>
                <h3>Пол</h3>
            </div>
            <div className={styles.filterGroup}>
                <h3>Назначение</h3>
            </div>
            <div className={styles.filterGroup}>
                <h3>Стандарт</h3>
            </div>
            <div className={styles.filterGroup}>
                <h3>Усилие срабатывания, DIN</h3>
            </div> 
            </>
            )}
            {category === "snowboards" && (
            <>
            <div className={styles.filterGroup}>
                <h3>Цена</h3>
            </div>
            <div className={styles.filterGroup}>
                <h3>Размеры</h3>
            </div>
            <div className={styles.filterGroup}>
                <h3>Бренд</h3>
            </div>
            <div className={styles.filterGroup}>
                <h3>Пол</h3>
            </div>
            <div className={styles.filterGroup}>
                <h3>Жесткость</h3>
            </div>
            <div className={styles.filterGroup}>
                <h3>Назначение</h3>
            </div>
            </>
            )}
            {category === "protection" && (
            <>
            <div className={styles.filterGroup}>
                <h3>Цена</h3>
            </div>
            <div className={styles.filterGroup}>
                <h3>Размеры</h3>
            </div>
            <div className={styles.filterGroup}>
                <h3>Бренд</h3>
            </div>
            <div className={styles.filterGroup}>
                <h3>Возраст</h3>
            </div>
            <div className={styles.filterGroup}>
                <h3>Защита частей тела</h3>
            </div>
            </>
            )}  
            {category === "equipment" && (
            <>
            <div className={styles.filterGroup}>
                <h3>Цена</h3>
            </div>
            <div className={styles.filterGroup}>
                <h3>Тип</h3>
            </div>
            <div className={styles.filterGroup}>
                <h3>Бренд</h3>
            </div>
            <div className={styles.filterGroup}>
                <h3>Пол</h3>
            </div>
            <div className={styles.filterGroup}>
                <h3>Размер</h3>
            </div>
            </>
            )}
            <button className={styles.filtrBtn}>Показать</button>
            <button className={styles.filtrBtn}>Сбросить</button>
        </div>
    );
};

export default FilterSidebar;