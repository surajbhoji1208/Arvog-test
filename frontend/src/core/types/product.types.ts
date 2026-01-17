export interface Product {
    id: string; // uuid
    name: string;
    description?: string;
    price: number;
}

export interface CreateProductDto {
    name: string;
    description?: string;
    price: number;
}

export interface UpdateProductDto extends Partial<CreateProductDto> { }
