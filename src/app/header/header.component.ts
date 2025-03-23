import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header class="navbar bg-base-200 shadow-sm px-10">
      <div class="navbar-start">
        <a routerLink="/" class="text-2xl font-bold">Pet the Cat</a>
      </div>
      <div class="navbar-end">
        <nav>
          <a routerLink="/upload" class="mr-4">Upload</a>
          <a routerLink="/gallery">Gallery</a>
        </nav>
      </div>
    </header>
  `
})
export class HeaderComponent {}
