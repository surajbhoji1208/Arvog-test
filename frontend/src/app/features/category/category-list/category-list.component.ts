import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  categories: any[] = [];
  displayedColumns: string[] = ['name', 'uniqueId', 'actions'];

  constructor(
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.apiService.getCategories().subscribe(res => {
      this.categories = res;
    });
  }
}
