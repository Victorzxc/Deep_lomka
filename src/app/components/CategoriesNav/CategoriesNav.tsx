import React from 'react';
import styles from './CategoriesNav.module.scss';

const categories = [
    { name: 'Защита', path: '/catalog/protection' },
    { name: 'Крепления горнолыжные', path: '/catalog/ski-bindings' },
    { name: 'Горные лыжи', path: '/catalog/alpine-skis' },
    { name: 'Горнолыжные ботинки', path: '/catalog/ski-boots' },
    { name: 'Сноуборды', path: '/catalog/snowboards' },
];

const CategoriesNav: React.FC = () => (
    <div className={styles.categoriesRow}>
        {categories.map((cat) => (
            <a key={cat.path} href={cat.path} className={styles.categoryLink}>
                {cat.name}
                <span className={styles.underline}></span>
            </a>
        ))}
    </div>
);

export default CategoriesNav;
