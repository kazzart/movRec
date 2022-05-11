import { Component, OnInit } from '@angular/core';
import { MessageModalService } from 'src/app/shared/message-modal/message-modal.service';

@Component({
  selector: 'app-message-modal',
  templateUrl: './massage-modal.component.html',
  styleUrls: ['./message-modal.component.css'],
})
export class MessageModalComponent implements OnInit {
  constructor(public service: MessageModalService) {}

  ngOnInit(): void {}
}
