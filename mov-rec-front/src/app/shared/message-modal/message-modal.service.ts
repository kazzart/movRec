import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageModalService {
  public text: string = '';
  public visible: boolean = false;

  constructor() {}

  public show(text: string = 'Операция успешно завершена'): void {
    this.text = text;
    this.visible = true;
  }

  public close(): void {
    this.visible = false;
    this.text = '';
  }
}
