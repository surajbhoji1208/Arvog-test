import { useEffect } from "react";
import { useProducts } from "../../core/context/ProductContext";
import { ProductCard } from "../../components/ProductCard";
import { Button } from "../../ui/Button";
import { Link } from "react-router-dom";
import { PlusCircle, Loader2 } from "lucide-react";

export const ProductList = () => {
    const { products, fetchProducts, deleteProduct, loading, error } = useProducts();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this product?")) {
            await deleteProduct(id);
        }
    };

    if (loading && products.length === 0) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 py-10">
                <p>Error: {error}</p>
                <Button onClick={fetchProducts} className="mt-4">Retry</Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-card p-6 rounded-lg shadow-sm border">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Products</h2>
                    <p className="text-muted-foreground">Manage your product inventory</p>
                </div>
                <Button asChild>
                    <Link to="/products/new">
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Product
                    </Link>
                </Button>
            </div>

            {products.length === 0 ? (
                <div className="text-center py-20 bg-muted/20 rounded-lg border border-dashed">
                    <h3 className="text-xl font-semibold">No products found</h3>
                    <p className="text-muted-foreground mt-2">Get started by creating a new product.</p>
                    <Button asChild className="mt-6">
                        <Link to="/products/new">Create Product</Link>
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} onDelete={handleDelete} />
                    ))}
                </div>
            )}
        </div>
    );
};
