import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  displayedColumns: string[] = ['email', 'createdAt', 'actions'];

  constructor(
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.apiService.getUsers().subscribe(res => {
      this.users = res;
    });
  }

  deleteUser(id: number) {
    if (confirm('Are you sure?')) {
      this.apiService.deleteUser(id).subscribe({
        next: () => {
          this.snackBar.open('User deleted', 'Close', { duration: 3000 });
          this.loadUsers();
        },
        error: (err) => this.snackBar.open(err.message, 'Close', { duration: 3000 })
      });
    }
  }
}
