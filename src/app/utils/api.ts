const API_BASE =  process.env.NEXT_PUBLIC_BACKEND_URL;


interface Characteristic {
    id: number;
    name: string;
    unit: string;
    categoryId: number;
    isFilter: boolean;
    type: string;
    createdAt: string;
    updatedAt: string;
}

interface ProductCharacteristic {
    id: number;
    productId: number;
    characteristicId: number;
    value: string;
    createdAt: string;
    updatedAt: string;
    characteristic: Characteristic;
}

interface ProductRaw {
    id: number;
    categoryId: number;
    brandId: number;
    name: string;
    description: string;
    price: string | number; 
    imageUrl: string;
    sku: string;
    stockQuantity: number;
    createdAt: string;
    updatedAt: string;
    productCharacteristics?: ProductCharacteristic[]; 
}

function transformProductPrice(product: ProductRaw) {
    return {
        ...product,
        price: Number(product.price),
    };
}

// Получить все продукты
export async function fetchProducts() {
    const res = await fetch(`${API_BASE}/products`, { cache: 'no-store' });
    if (!res.ok) {
        throw new Error('Ошибка загрузки продуктов');
    }
    const data = await res.json();
    return data.map(transformProductPrice);
}

// Получить продукт по ID
export async function fetchProductById(id: number) {
    const res = await fetch(`${API_BASE}/products/${id}`, { cache: 'no-store' });
    if (!res.ok) {
        throw new Error('Ошибка загрузки продукта');
    }
    const product = await res.json();
    return transformProductPrice(product);
}

// Получить характеристики продукта по ID продукта
export async function fetchProductCharacteristics(productId: number) {
    const res = await fetch(`${API_BASE}/products/${productId}/characteristics`, { cache: 'no-store' });
    if (!res.ok) {
        throw new Error('Ошибка загрузки характеристик продукта');
    }
    return res.json();
}

// Фильтрация продуктов (POST)
interface FilterBody {
    categoryId?: number;
    brandId?: number;
    priceFrom?: number;
    priceTo?: number;
    characteristics?: {
        characteristicId: number;
        value: string
    }[];
}

export async function filterProducts(filter: FilterBody) {
    const res = await fetch(`${API_BASE}/products/filter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filter),
        cache: 'no-store',
    });
    if (!res.ok) {
        throw new Error('Ошибка фильтрации продуктов');
    }
    const data = await res.json();
    return data.map(transformProductPrice);
}
