import type { Product } from "../core/types/product.types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "../ui/Card";
import { Button } from "../ui/Button";
import { Link } from "react-router-dom";
import { Edit, Trash2, Eye } from "lucide-react";

interface ProductCardProps {
    product: Product;
    onDelete: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onDelete }) => {
    return (
        <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
            <CardHeader>
                <CardTitle className="line-clamp-1" title={product.name}>{product.name}</CardTitle>
                <CardDescription className="line-clamp-2" title={product.description}>
                    {product.description || "No description available"}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <p className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter className="flex justify-between gap-2">
                <Button variant="outline" size="sm" asChild>
                    <Link to={`/products/${product.id}`}>
                        <Eye className="w-4 h-4 mr-2" /> View
                    </Link>
                </Button>
                <div className="flex gap-2">
                    <Button variant="secondary" size="sm" asChild>
                        <Link to={`/products/${product.id}/edit`}>
                            <Edit className="w-4 h-4" />
                        </Link>
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => onDelete(product.id)}>
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};
