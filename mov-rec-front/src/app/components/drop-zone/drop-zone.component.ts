import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-drop-zone',
  templateUrl: './drop-zone.component.html',
  styleUrls: ['./drop-zone.component.css'],
})
export class DropZoneComponent implements OnInit {
  private selectedFile: File | undefined = undefined;
  @Output() fileChanged: EventEmitter<File | undefined> = new EventEmitter<
    File | undefined
  >();
  constructor() {}

  ngOnInit(): void {}

  public dropFile(event: any): void {
    this.selectedFile = event.target.files[0];
    this.fileChanged.next(this.selectedFile);
  }
}
