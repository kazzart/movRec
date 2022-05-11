import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { User } from 'src/app/interfaces/interface';
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
}
