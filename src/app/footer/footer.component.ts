import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer sm:footer-horizontal footer-center bg-base-200 p-4">
      <aside>
        <p>Copyright © {{ Date.getFullYear() }} - All right reserved by ACME Industries Ltd</p>
      </aside>
    </footer>
  `
})
export class FooterComponent {
  protected readonly Date = new Date;
}
