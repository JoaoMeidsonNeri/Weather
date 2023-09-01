import { Component } from "@angular/core";

@Component({
  selector: 'app-loader',
  template: `
  <div class="d-flex justify-content-center" >
    <div class="spinner-grow text-primary" role="status" style="width: 3rem; height: 3rem;">
      <span class="sr-only"></span>
    </div>
  </div>
  `,
})
export class LoaderComponent {
}