import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/interface';
import { UserService } from 'src/app/shared/user/user.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
})
export class RatingComponent implements OnInit {
  public movie: Movie | undefined = undefined;

  constructor(public userService: UserService) {}

  ngOnInit(): void {}

  public selectMovie(movie: Movie): void {
    this.movie = movie;
  }
}
