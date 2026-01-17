import { Routes, Route, Navigate } from 'react-router-dom';
import { ProductProvider } from './core/context/ProductContext';
import { MainLayout } from './routes/MainLayout';
import { ProductList } from './routes/products/ProductList';
import { ProductForm } from './routes/products/ProductForm';
import { ProductDetails } from './routes/products/ProductDetails';

function App() {
  return (
    <ProductProvider>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/products" replace />} />
          <Route path="products" element={<ProductList />} />
          <Route path="products/new" element={<ProductForm />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route path="products/:id/edit" element={<ProductForm />} />
          <Route path="*" element={
            <div className="flex flex-col items-center justify-center h-[50vh]">
              <h2 className="text-4xl font-bold">404</h2>
              <p className="text-muted-foreground mt-2">Page not found</p>
            </div>
          } />
        </Route>
      </Routes>
    </ProductProvider>
  );
}

export default App;
