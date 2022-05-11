import { HttpClient, HttpParams } from '@angular/common/http';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Movie } from 'src/app/interfaces/interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css'],
})
export class SearchInputComponent implements OnInit {
  public query: string = '';
  public options: Movie[] = [];
  public selected: boolean = false;
  private clickedInside: boolean = false;
  @Output() movieSelected: EventEmitter<Movie> = new EventEmitter<Movie>();
  @ViewChild('searchContainer', { read: ElementRef }) eRef!: ElementRef;
  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (this.eRef.nativeElement.contains(event.target)) {
      this.clickedInside = true;
    } else {
      this.clickedInside = false;
    }
  }

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {}

  public async getMovies(): Promise<void> {
    let params = new HttpParams();
    params = params.set('movie_substr', this.query);
    this.options = (
      await firstValueFrom(
        this.httpClient.get<{ movies: Movie[] }>(
          environment.apiURL + '/data/movies',
          { params: params }
        )
      )
    ).movies;
  }

  public queryChanged(query: string): void {
    this.query = query;
    this.getMovies();
    this.selected = false;
  }

  public selectMovie(movie: Movie): void {
    this.movieSelected.next(movie);
    this.query = movie.title;
    this.selected = true;
  }

  public dropdownVisible(): boolean {
    return (
      this.query.length > 0 &&
      this.options.length > 0 &&
      !this.selected &&
      this.clickedInside
    );
  }
}
