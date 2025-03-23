import { Routes } from '@angular/router';
import { UploadPageComponent } from './upload-page/upload-page.component';
import { GalleryPageComponent } from './gallery-page/gallery-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'upload', pathMatch: 'full' },
  { path: 'upload', component: UploadPageComponent },
  { path: 'gallery', component: GalleryPageComponent }
];
