import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { useProducts } from "../../core/context/ProductContext";
import { productSchema, type ProductFormValues } from "../../core/validation/product.schema";
import { Button } from "../../ui/Button";
import { Input } from "../../ui/Input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../ui/Card";
import { Loader2 } from "lucide-react";

export const ProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addProduct, updateProduct, fetchProduct, currentProduct, loading, error, clearCurrentProduct } = useProducts();
    const isEditMode = !!id;

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: "",
            description: "",
            price: 0,
        },
    });

    useEffect(() => {
        if (isEditMode && id) {
            fetchProduct(id);
        } else {
            clearCurrentProduct();
            reset({ name: "", description: "", price: 0 });
        }
    }, [id, fetchProduct, clearCurrentProduct, reset, isEditMode]);

    useEffect(() => {
        if (isEditMode && currentProduct) {
            setValue("name", currentProduct.name);
            setValue("description", currentProduct.description || "");
            setValue("price", currentProduct.price);
        }
    }, [currentProduct, setValue, isEditMode]);

    const onSubmit = async (data: ProductFormValues) => {
        try {
            if (isEditMode && id) {
                await updateProduct(id, data);
            } else {
                await addProduct(data);
            }
            navigate("/products");
        } catch (err) {
            // Error handled by context
        }
    };

    if (loading && isEditMode && !currentProduct) {
        return (
            <div className="flex justify-center p-10">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>{isEditMode ? "Edit Product" : "Create Product"}</CardTitle>
                </CardHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className="space-y-4">
                        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium">Name</label>
                            <Input id="name" {...register("name")} placeholder="Product Name" />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="price" className="text-sm font-medium">Price</label>
                            <Input
                                id="price"
                                type="number"
                                step="0.01"
                                {...register("price", { valueAsNumber: true })}
                                placeholder="0.00"
                            />
                            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="description" className="text-sm font-medium">Description</label>
                            <Input id="description" {...register("description")} placeholder="Product Description" />
                            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button type="button" variant="outline" onClick={() => navigate("/products")}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting || loading}>
                            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            {isEditMode ? "Update" : "Create"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};
