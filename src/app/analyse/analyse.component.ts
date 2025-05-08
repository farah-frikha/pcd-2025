import { Component } from '@angular/core';

@Component({
  selector: 'app-analyse',
  templateUrl: './analyse.component.html',
  styleUrls: ['./analyse.component.css']
})
export class AnalyseComponent {
  capturedImage: string | null = null;
  segmentedImage: string | null = null;

  captureImage(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.capturedImage = e.target.result;
        // Here you would typically call your image segmentation service
        // For now, we'll just copy the original image
        this.segmentedImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
