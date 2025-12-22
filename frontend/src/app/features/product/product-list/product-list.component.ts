import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'category', 'price', 'uniqueId'];
  data: any[] = [];
  resultsLength = 0;
  isLoadingResults = true;
  searchStr = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private apiService: ApiService) { }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.apiService.getProducts(
            this.paginator.pageIndex + 1,
            this.paginator.pageSize,
            this.searchStr,
            this.sort.direction || 'asc'
          ).pipe(catchError(() => observableOf(null)));
        }),
        map(data => {
          this.isLoadingResults = false;
          if (data === null) return [];
          this.resultsLength = data.totalItems;
          return data.products;
        })
      ).subscribe(data => this.data = data);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchStr = filterValue.trim().toLowerCase();
    this.paginator.pageIndex = 0; // Reset to page 1
    // Trigger reload manually or via subject
    this.refresh();
  }

  refresh() {
    this.isLoadingResults = true;
    this.apiService.getProducts(
      this.paginator.pageIndex + 1,
      this.paginator.pageSize,
      this.searchStr,
      this.sort.direction || 'asc'
    ).subscribe(data => {
      this.isLoadingResults = false;
      this.resultsLength = data.totalItems;
      this.data = data.products;
    });
  }

  downloadReport() {
    this.apiService.downloadReport();
  }
}
