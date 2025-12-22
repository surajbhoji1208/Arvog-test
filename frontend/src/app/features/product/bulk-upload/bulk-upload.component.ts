import { Component } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bulk-upload',
  templateUrl: './bulk-upload.component.html',
  styleUrls: ['./bulk-upload.component.scss']
})
export class BulkUploadComponent {
  file: File | null = null;
  isUploading = false;

  constructor(private apiService: ApiService, private snackBar: MatSnackBar) { }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.file = file;
    }
  }

  upload() {
    if (this.file) {
      this.isUploading = true;
      this.apiService.uploadProducts(this.file).subscribe({
        next: (res) => {
          this.isUploading = false;
          this.snackBar.open(`Processed ${res.processedCount} items.`, 'Close', { duration: 5000 });
        },
        error: (err) => {
          this.isUploading = false;
          this.snackBar.open('Upload Failed: ' + err.message, 'Close', { duration: 5000 });
        }
      });
    }
  }
}
