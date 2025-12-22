import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './features/product/product-list/product-list.component';
import { BulkUploadComponent } from './features/product/bulk-upload/bulk-upload.component';
import { ProductFormComponent } from './features/product/product-form/product-form.component';
// Import other components if they were generated
import { UserListComponent } from './features/user/user-list/user-list.component';
import { CategoryListComponent } from './features/category/category-list/category-list.component';
import { UserFormComponent } from './features/user/user-form/user-form.component';
import { CategoryFormComponent } from './features/category/category-form/category-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductListComponent },
  { path: 'products/upload', component: BulkUploadComponent },
  { path: 'products/new', component: ProductFormComponent },
  { path: 'products/:id', component: ProductFormComponent },
  { path: 'users', component: UserListComponent },
  { path: 'users/new', component: UserFormComponent },
  { path: 'users/:id', component: UserFormComponent },
  { path: 'categories', component: CategoryListComponent },
  { path: 'categories/new', component: CategoryFormComponent },
  { path: 'categories/:id', component: CategoryFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
