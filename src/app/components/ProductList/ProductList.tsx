import React from 'react';
import ProductCard from '@/app/components/ProductCard/ProductCard';

interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string | null;
  categoryId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ProductListProps {
  products: IProduct[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => (
  <div className="product-list">
    {products.map((product) => (
      <ProductCard
        key={product.id}
        id={product.id}
        name={product.name}
        description={product.description}
        price={Number(product.price)}
        image={product.imageUrl || ""}
      />
    ))}
  </div>
);

export default ProductList;
