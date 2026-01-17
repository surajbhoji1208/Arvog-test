import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Product, CreateProductDto, UpdateProductDto } from '../types/product.types';
import { productService } from '../services/product.service';

interface ProductContextType {
    products: Product[];
    currentProduct: Product | null;
    loading: boolean;
    error: string | null;
    fetchProducts: () => Promise<void>;
    fetchProduct: (id: string) => Promise<void>;
    addProduct: (data: CreateProductDto) => Promise<void>;
    updateProduct: (id: string, data: UpdateProductDto) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;
    clearCurrentProduct: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleError = (err: any) => {
        console.error(err);
        setError(err instanceof Error ? err.message : 'An error occurred');
    };

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await productService.getAll();
            setProducts(data);
        } catch (err) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchProduct = useCallback(async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            const data = await productService.getOne(id);
            setCurrentProduct(data);
        } catch (err) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    const addProduct = useCallback(async (data: CreateProductDto) => {
        setLoading(true);
        setError(null);
        try {
            const newProduct = await productService.create(data);
            setProducts((prev) => [...prev, newProduct]);
        } catch (err) {
            handleError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const updateProduct = useCallback(async (id: string, data: UpdateProductDto) => {
        setLoading(true);
        setError(null);
        try {
            const updatedProduct = await productService.update(id, data);
            setProducts((prev) => prev.map((p) => (p.id === id ? updatedProduct : p)));
            if (currentProduct?.id === id) {
                setCurrentProduct(updatedProduct);
            }
        } catch (err) {
            handleError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [currentProduct]);

    const deleteProduct = useCallback(async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            await productService.delete(id);
            setProducts((prev) => prev.filter((p) => p.id !== id));
            if (currentProduct?.id === id) {
                setCurrentProduct(null);
            }
        } catch (err) {
            handleError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [currentProduct]);

    const clearCurrentProduct = useCallback(() => {
        setCurrentProduct(null);
        setError(null);
    }, []);

    return (
        <ProductContext.Provider
            value={{
                products,
                currentProduct,
                loading,
                error,
                fetchProducts,
                fetchProduct,
                addProduct,
                updateProduct,
                deleteProduct,
                clearCurrentProduct,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (context === undefined) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
};
