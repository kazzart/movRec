import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { LoaderService } from 'src/app/shared/loader/loader.service';
import { MessageModalService } from 'src/app/shared/message-modal/message-modal.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-data-loader',
  templateUrl: './data-loader.component.html',
  styleUrls: ['./data-loader.component.css'],
})
export class DataLoaderComponent implements OnInit {
  public movieFile: File | undefined = undefined;
  public ratingFile: File | undefined = undefined;

  constructor(
    private httpClient: HttpClient,
    private messageModal: MessageModalService,
    private loader: LoaderService
  ) {}

  ngOnInit(): void {}

  public dropMovieFile(file: File | undefined): void {
    this.movieFile = file;
  }

  public dropRatingFile(file: File | undefined): void {
    this.ratingFile = file;
  }

  public async uploadMovieFile(): Promise<void> {
    if (this.movieFile === undefined) {
      this.messageModal.show('Файл не выбран');
      return;
    }
    this.loader.show();
    let formData: FormData = new FormData();
    formData.append('file', this.movieFile, this.movieFile.name);
    try {
      await firstValueFrom(
        this.httpClient.post(environment.apiURL + '/data/movies/', formData)
      );
      this.loader.hide();
      this.messageModal.show('Данные успешно загружены');
    } catch (error) {
      this.loader.hide();
      this.messageModal.show('Не удалось загрузить данные');
      console.error(error);
    }
  }

  public async uploadRatingFile(): Promise<void> {
    if (this.ratingFile === undefined) {
      this.messageModal.show('Файл не выбран');
      return;
    }
    this.loader.show();
    let formData: FormData = new FormData();
    formData.append('file', this.ratingFile, this.ratingFile.name);
    try {
      await firstValueFrom(
        this.httpClient.post(environment.apiURL + '/data/ratings/', formData)
      );
      this.loader.hide();
      this.messageModal.show('Данные успешно загружены');
    } catch (error) {
      this.loader.hide();
      this.messageModal.show('Не удалось загрузить данные');
      console.error(error);
    }
  }
}
