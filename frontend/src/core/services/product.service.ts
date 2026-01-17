import api from './api';
import type { Product, CreateProductDto, UpdateProductDto } from '../types/product.types';

export const productService = {
    getAll: async (): Promise<Product[]> => {
        const response = await api.get('/products');
        return response.data;
    },

    getOne: async (id: string): Promise<Product> => {
        const response = await api.get(`/products/${id}`);
        return response.data;
    },

    create: async (data: CreateProductDto): Promise<Product> => {
        const response = await api.post('/products', data);
        return response.data;
    },

    update: async (id: string, data: UpdateProductDto): Promise<Product> => {
        const response = await api.patch(`/products/${id}`, data);
        return response.data;
    },

    delete: async (id: string): Promise<void> => {
        await api.delete(`/products/${id}`);
    },
};
