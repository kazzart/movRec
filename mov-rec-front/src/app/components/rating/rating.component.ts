import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user/user.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
})
export class RatingComponent implements OnInit {
  constructor(public userService: UserService) {}

  ngOnInit(): void {}
}
