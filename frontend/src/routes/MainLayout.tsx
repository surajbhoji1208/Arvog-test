import { Outlet, Link, useLocation } from "react-router-dom";
import { cn } from "../core/utils/cn";

export const MainLayout = () => {
    const location = useLocation();

    const navItems = [
        { href: "/products", label: "Products" },
        { href: "/products/new", label: "Create Product" },
    ];

    return (
        <div className="min-h-screen bg-background">
            <nav className="border-b bg-card">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link to="/" className="text-xl font-bold text-primary">
                        ProductManager
                    </Link>
                    <div className="flex gap-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                to={item.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-primary",
                                    location.pathname === item.href
                                        ? "text-primary"
                                        : "text-muted-foreground"
                                )}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>
            <main className="container mx-auto px-4 py-8">
                <Outlet />
            </main>
        </div>
    );
};
