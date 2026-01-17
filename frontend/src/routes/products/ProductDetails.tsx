import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useProducts } from "../../core/context/ProductContext";
import { Button } from "../../ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../ui/Card";
import { Loader2, ArrowLeft, Edit, Trash2 } from "lucide-react";

export const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { currentProduct, fetchProduct, deleteProduct, loading, error } = useProducts();

    useEffect(() => {
        if (id) {
            fetchProduct(id);
        }
    }, [id, fetchProduct]);

    const handleDelete = async () => {
        if (id && confirm("Are you sure you want to delete this product?")) {
            await deleteProduct(id);
            navigate("/products");
        }
    };

    if (loading || !currentProduct) {
        return (
            <div className="flex justify-center p-10">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 py-10">
                <p>Error: {error}</p>
                <Button variant="link" onClick={() => navigate("/products")}>Back to List</Button>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <Button variant="ghost" asChild className="mb-4">
                <Link to="/products">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Products
                </Link>
            </Button>

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="text-3xl">{currentProduct.name}</CardTitle>
                            <CardDescription className="text-lg mt-2">{currentProduct.description}</CardDescription>
                        </div>
                        <div className="text-3xl font-bold text-primary">
                            ${currentProduct.price.toFixed(2)}
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="bg-muted p-4 rounded-md">
                        <p className="text-sm text-muted-foreground">Product ID: {currentProduct.id}</p>
                    </div>
                </CardContent>
                <CardFooter className="flex gap-4 justify-end">
                    <Button variant="outline" asChild>
                        <Link to={`/products/${currentProduct.id}/edit`}>
                            <Edit className="w-4 h-4 mr-2" /> Edit
                        </Link>
                    </Button>
                    <Button variant="destructive" onClick={handleDelete}>
                        <Trash2 className="w-4 h-4 mr-2" /> Delete
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};
