import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageModalService } from 'src/app/shared/message-modal/message-modal.service';
import { UserService } from 'src/app/shared/user/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  public authLogin: string = '';
  public registerLogin: string = '';
  constructor(
    private user: UserService,
    private messageModal: MessageModalService
  ) {}

  ngOnInit(): void {}

  public auth(): void {
    if (this.authLogin == '') {
      this.messageModal.show('Никнейм не указан');
      return;
    }
    this.user.getUser(this.authLogin).catch((error) => {
      if (error instanceof HttpErrorResponse && error.status === 404) {
        this.messageModal.show('Пользователь с таким никнеймом не найден');
      } else {
        this.messageModal.show('Произошла ошибка');
        console.error(error);
      }
    });
  }

  public register(): void {
    if (this.registerLogin == '') {
      this.messageModal.show('Никнейм не указан');
      return;
    }
    this.user.createUser(this.registerLogin).catch((error) => {
      if (error instanceof HttpErrorResponse && error.status === 409) {
        this.messageModal.show('Пользователь с таким никнеймом уже существует');
      } else {
        this.messageModal.show('Произошла ошибка');
        console.error(error);
      }
    });
  }
}
