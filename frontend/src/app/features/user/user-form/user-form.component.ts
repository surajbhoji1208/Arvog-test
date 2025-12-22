import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  form: FormGroup;
  isEditMode = false;
  userId: number | null = null;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.userId = +params['id'];
        this.loadUser(this.userId);
      } else {
        this.form.get('password')?.addValidators(Validators.required);
      }
    });
  }

  loadUser(id: number) {
    this.isLoading = true;
    this.apiService.getUser(id).subscribe(user => {
      this.form.patchValue({
        email: user.email
      });
      this.isLoading = false;
    }, err => {
      this.isLoading = false;
      this.snackBar.open('Error loading user', 'Close', { duration: 3000 });
      this.router.navigate(['/users']);
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.isLoading = true;
      const data = this.form.value;

      if (this.isEditMode && this.userId) {
        if (!data.password) delete data.password;

        this.apiService.updateUser(this.userId, data).subscribe({
          next: () => {
            this.snackBar.open('User updated', 'Close', { duration: 3000 });
            this.router.navigate(['/users']);
          },
          error: (err) => {
            this.isLoading = false;
            this.snackBar.open('Error: ' + err.message, 'Close', { duration: 3000 });
          }
        });
      } else {
        this.apiService.createUser(data).subscribe({
          next: () => {
            this.snackBar.open('User created', 'Close', { duration: 3000 });
            this.router.navigate(['/users']);
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
