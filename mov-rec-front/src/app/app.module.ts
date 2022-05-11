import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthComponent } from './components/auth/auth.component';
import { DataLoaderComponent } from './components/data-loader/data-loader.component';
import { RatingComponent } from './components/rating/rating.component';
import { SearchInputComponent } from './components/search-input/search-input.component';

@NgModule({
  declarations: [AppComponent, MainPageComponent, HeaderComponent, AuthComponent, DataLoaderComponent, RatingComponent, SearchInputComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
