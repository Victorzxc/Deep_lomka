export interface Characteristic {
    id: number;
    name: string;
    unit: string | null;
    categoryId: number;
    isFilter: boolean;
    type: string;
    createdAt: string;
    updatedAt: string;
}

export interface ProductCharacteristic {
    id: number;
    productId: number;
    characteristicId: number;
    value: string;
    createdAt: string;
    updatedAt: string;
    characteristic: Characteristic;
}

export interface Product {
    id: number;
    categoryId: number;
    brandId: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    sku: string;
    stockQuantity: number;
    createdAt: string;
    updatedAt: string;
    productCharacteristics?: ProductCharacteristic[];
}
