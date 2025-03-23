import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer sm:footer-horizontal footer-center bg-base-200 p-4">
      <aside>
        <p>Copyright © {{ Date.getFullYear() }} - Made by <a href="https://rixi.dev">Rixi.dev</a></p>
      </aside>
    </footer>
  `
})
export class FooterComponent {
  protected readonly Date = new Date;
}
