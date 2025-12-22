import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

import { ProductListComponent } from './features/product/product-list/product-list.component';
import { BulkUploadComponent } from './features/product/bulk-upload/bulk-upload.component';
import { ProductFormComponent } from './features/product/product-form/product-form.component';
import { UserListComponent } from './features/user/user-list/user-list.component';
import { CategoryListComponent } from './features/category/category-list/category-list.component';
import { UserFormComponent } from './features/user/user-form/user-form.component';
import { CategoryFormComponent } from './features/category/category-form/category-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    BulkUploadComponent,
    ProductFormComponent,
    UserListComponent,
    CategoryListComponent,
    UserFormComponent,
    CategoryFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
