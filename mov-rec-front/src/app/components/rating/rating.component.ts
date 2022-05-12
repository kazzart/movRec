import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/interface';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { MessageModalService } from 'src/app/shared/message-modal/message-modal.service';
import { UserService } from 'src/app/shared/user/user.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
})
export class RatingComponent implements OnInit {
  public movie: Movie | undefined = undefined;
  public rating: number = 0;
  public avgRating: number = 0;
  constructor(
    public userService: UserService,
    private messageModal: MessageModalService,
    private loader: LoaderService
  ) {}

  ngOnInit(): void {}

  public selectMovie(movie: Movie): void {
    this.movie = movie;
    this.getRating();
    this.getAvgRating();
  }

  public changeRating(rating: number): void {
    this.rating = rating;
    this.putRating();
  }

  public getRating(): void {
    this.userService
      .getRating(this.movie!.id)
      .then((rating) => {
        this.rating = rating.rating;
      })
      .catch((error) => {
        this.rating = 0;
      });
  }

  public getAvgRating(): void {
    this.loader.show();
    this.userService
      .getMeanRating(this.movie!.id)
      .then((rating) => {
        this.loader.hide();
        this.avgRating = rating.avg;
      })
      .catch((error) => {
        this.loader.hide();
        this.avgRating = 0;
      });
  }

  public async putRating(): Promise<void> {
    try {
      this.userService.putRating(this.movie!.id, this.rating);
      this.messageModal.show('Оценка добавлена');
    } catch (error) {
      this.messageModal.show('Не удалось добавить оценку');
      console.error(error);
    }
  }

  public async getRecommendations(): Promise<void> {
    try {
      this.loader.show();
      let movieRecs = (await this.userService.getRecommendations()).movies;
      let recommendations: string = '';
      for (let i = 0; i < movieRecs.length; i++) {
        const movie = movieRecs[i];
        recommendations += `${i + 1}. ` + movie.title + '\n';
      }
      this.loader.hide();
      this.messageModal.show(recommendations);
    } catch (error) {
      this.loader.hide();
      this.messageModal.show('Не удалось получить рекомендации');
      console.error(error);
    }
  }
}
