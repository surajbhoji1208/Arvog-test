import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  form: FormGroup;
  isEditMode = false;
  categoryId: number | null = null;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Check for Edit Mode
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.categoryId = +params['id'];
        this.loadCategory(this.categoryId);
      }
    });
  }

  loadCategory(id: number) {
    this.isLoading = true;
    this.apiService.getCategory(id).subscribe(cat => {
      this.form.patchValue({
        name: cat.name
      });
      this.isLoading = false;
    }, err => {
      this.isLoading = false;
      this.snackBar.open('Error loading category', 'Close', { duration: 3000 });
      this.router.navigate(['/categories']);
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.isLoading = true;
      const data = this.form.value;

      if (this.isEditMode && this.categoryId) {
        this.apiService.updateCategory(this.categoryId, data).subscribe({
          next: () => {
            this.snackBar.open('Category updated', 'Close', { duration: 3000 });
            this.router.navigate(['/categories']);
          },
          error: (err) => {
            this.isLoading = false;
            this.snackBar.open('Error: ' + err.message, 'Close', { duration: 3000 });
          }
        });
      } else {
        this.apiService.createCategory(data).subscribe({
          next: () => {
            this.snackBar.open('Category created', 'Close', { duration: 3000 });
            this.router.navigate(['/categories']);
          },
          error: (err) => {
            this.isLoading = false;
            this.snackBar.open('Error: ' + err.message, 'Close', { duration: 3000 });
          }
        });
      }
    }
  }
}
