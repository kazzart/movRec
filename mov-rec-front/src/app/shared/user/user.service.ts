import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AvgRating, Movie, Rating, User } from 'src/app/interfaces/interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public user: User | undefined = undefined;

  constructor(private httpClient: HttpClient) {}

  public async createUser(nickname: string): Promise<void> {
    try {
      this.user = await firstValueFrom(
        this.httpClient.post<User>(environment.apiURL + '/data/user/', {
          nickname: nickname,
        })
      );
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async getUser(nickname: string): Promise<void> {
    try {
      let params = new HttpParams();
      params = params.set('nickname', nickname);
      this.user = await firstValueFrom(
        this.httpClient.get<User>(environment.apiURL + '/data/user/', {
          params: params,
        })
      );
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public getRating(movieId: number): Promise<Rating> {
    let params = new HttpParams();
    params = params.set('movie_id', movieId);
    params = params.set('user_id', this.user!.id);
    return firstValueFrom(
      this.httpClient.get<Rating>(environment.apiURL + '/data/rating/', {
        params: params,
      })
    );
  }

  public getMeanRating(movieId: number): Promise<AvgRating> {
    let params = new HttpParams();
    params = params.set('movie_id', movieId);
    return firstValueFrom(
      this.httpClient.get<AvgRating>(environment.apiURL + '/data/avg_rating/', {
        params: params,
      })
    );
  }

  public putRating(movieId: number, rating: number): Promise<void> {
    let body: Rating = {
      movie_id: movieId,
      user_id: this.user!.id,
      rating: rating,
    };
    return firstValueFrom(
      this.httpClient.put<void>(environment.apiURL + '/data/rating/', body)
    );
  }

  public getRecommendations(): Promise<{ movies: Movie[] }> {
    return firstValueFrom(
      this.httpClient.get<{ movies: Movie[] }>(
        environment.apiURL + `/recommendation/${this.user!.id}/`
      )
    );
  }
}
