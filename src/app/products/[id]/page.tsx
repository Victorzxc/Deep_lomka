import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './ProductPage.module.scss';
import productsData from '@/app/data/products.json';

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage: React.FC<ProductPageProps> = ({ params }) => {
  const { id } = params;
  const product = productsData.find(product => product.id === id);

  if (!product) {
    return <div>Товар не найден</div>;
  }


  let categoryLink = '';
  let categoryName = '';

  switch (product.categoryId) {
    case 'alpine-skis':
      categoryLink = '/catalog/alpine-skis';
      categoryName = 'Горные лыжи';
      break;
    case 'ski-bindings':
      categoryLink = '/catalog/ski-bindings';
      categoryName = 'Крепления для горных лыж';
      break;
    case 'snowboards':
      categoryLink = '/catalog/snowboards';
      categoryName = 'Сноуборды';
      break;
    case 'protection':
      categoryLink = '/catalog/protection';
      categoryName = 'Защита';
      break;
    case 'equipment':
      categoryLink = '/catalog/equipment';
      categoryName = 'Экипировка';
      break;
    default:
      categoryLink = '/catalog';
      categoryName = 'Каталог';
  }

  return (
    <div className={styles.productPage}>
      <div className={styles.breadcrumbs}>
        <Link href="/">Назад</Link> / <Link href="/catalog">Каталог</Link> / <Link href={categoryLink}>{categoryName}</Link> / {product.name}
      </div>
      <div className={styles.productContainer}>
        <div className={styles.imageColumn}>
          <Image className={styles.img}
            src={product.imageUrl}
            alt={product.name}
            width={400}
            height={400}

          />
        </div>
        <div className={styles.detailsColumn}>
          <h1 className={styles.productName}>{product.name}</h1>
          <p className={styles.description}>{product.description}</p>
          <div className={styles.characteristics}>
            {Object.entries(product).map(([key, value]) => {
              if (!['id', 'name', 'description', 'price', 'imageUrl', 'categoryId'].includes(key) && value) {
                return (
                  <div className={styles.characteristic} key={key}>
                    <span className={styles.characteristicLabel}>{key}:</span>
                    <span>{value}</span>
                  </div>
                );
              }
              return null;
            })}
          </div>
          <div className={styles.priceContainer}>
            <span className={styles.price}>${product.price.toFixed(2)}</span>
            <button className={styles.addToCartButton}>Добавить в корзину</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;