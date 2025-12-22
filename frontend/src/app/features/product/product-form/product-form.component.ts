import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  form: FormGroup;
  categories: any[] = [];
  isEditMode = false;
  productId: number | null = null;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      categoryId: ['', Validators.required],
      image: [''] // Optional URL
    });
  }

  ngOnInit(): void {
    // Load Categories
    this.apiService.getCategories().subscribe(res => {
      this.categories = res;
    });

    // Check for Edit Mode
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.productId = +params['id'];
        this.loadProduct(this.productId);
      }
    });
  }

  loadProduct(id: number) {
    this.isLoading = true;
    this.apiService.getProduct(id).subscribe(product => {
      this.form.patchValue({
        name: product.name,
        price: product.price,
        categoryId: product.categoryId,
        image: product.image
      });
      this.isLoading = false;
    }, err => {
      this.isLoading = false;
      this.snackBar.open('Error loading product', 'Close', { duration: 3000 });
      this.router.navigate(['/products']);
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.isLoading = true;
      const data = this.form.value;

      if (this.isEditMode && this.productId) {
        this.apiService.updateProduct(this.productId, data).subscribe({
          next: () => {
            this.snackBar.open('Product updated', 'Close', { duration: 3000 });
            this.router.navigate(['/products']);
          },
          error: (err) => {
            this.isLoading = false;
            this.snackBar.open('Error: ' + err.error?.error || err.message, 'Close', { duration: 3000 });
          }
        });
      } else {
        this.apiService.createProduct(data).subscribe({
          next: () => {
            this.snackBar.open('Product created', 'Close', { duration: 3000 });
            this.router.navigate(['/products']);
          },
          error: (err) => {
            this.isLoading = false;
            this.snackBar.open('Error: ' + err.error?.error || err.message, 'Close', { duration: 3000 });
          }
        });
      }
    }
  }
}
