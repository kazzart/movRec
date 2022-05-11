import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  public authLogin: string = '';
  public registerLogin: string = '';
  constructor(private user: UserService) {}

  ngOnInit(): void {}

  public auth() {
    this.user.getUser(this.authLogin).catch((error) => {
      console.error(error);
    });
  }

  public register() {
    this.user.createUser(this.registerLogin).catch((error) => {
      console.error(error);
    });
  }
}
