import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  public visible: boolean = false;

  constructor() {}

  public show() {
    this.visible = true;
  }

  public hide() {
    this.visible = false;
  }
}
