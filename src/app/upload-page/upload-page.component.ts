import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import '@tensorflow/tfjs-backend-webgl';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';

@Component({
  selector: 'app-upload-page',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './upload-page.component.html'
})
export class UploadPageComponent implements AfterViewInit {
  uploadedImageUrl: string | null = null;
  errorMessage: string | null = null;
  predictionResultLabel: string | null = null;
  classifier: any;
  isCat = false;

  @ViewChild('catImage') catImage!: ElementRef<HTMLImageElement>;

  async ngAfterViewInit(): Promise<void> {
    try {
      await tf.setBackend('webgl').then(() => tf.ready());
      this.classifier = await mobilenet.load();
      console.log('Model loaded!');
    } catch (error) {
      console.error('Error loading model: ', error);
    }
  }

  onFileSelected(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (!file.type.startsWith('image/')) {
        this.errorMessage = "That's not an image 😿";
        this.uploadedImageUrl = null;
        return;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.uploadedImageUrl = e.target.result;
        setTimeout(() => {
          this.classifyImage();
        }, 100);
      };
      this.errorMessage = null;
      reader.readAsDataURL(file);
    }
  }

  classifyImage(): void {
    if (this.classifier && this.catImage && this.catImage.nativeElement) {
      this.classifier.classify(this.catImage.nativeElement)
        .then((results: any) => {
          console.log('Results: ', results);
          const label = results[0].className;
          const probability = results[0].probability * 100;
          const lowerLabel = label.toLowerCase();

          const blacklistedTerms = ['polecat'];

          const isValidCat = lowerLabel.includes('cat') && !blacklistedTerms.some(term => lowerLabel.includes(term));

          if (isValidCat && probability > 10) {
            this.predictionResultLabel = '😻 ' + label + ' (' + probability.toFixed(2) + '%)';
            this.isCat = true;
          } else {
            if (isValidCat) {
              this.predictionResultLabel = '🙀❓ ' + label + ' (' + probability.toFixed(2) + '%)';
            } else {
              this.predictionResultLabel = '😿 ' + label + ' (' + probability.toFixed(2) + '%)';
            }
            this.isCat = false;
          }
        })
        .catch((error: any) => {
          console.error('Error classifying image: ', error);
          this.predictionResultLabel = null;
        });
    }
  }
}
