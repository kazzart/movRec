import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>
    <app-message-modal></app-message-modal>
    <app-loader></app-loader>`,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'mov-rec-front';
}
