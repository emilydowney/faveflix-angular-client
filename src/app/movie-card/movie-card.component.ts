import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { GenreCardComponent } from '../genre-card/genre-card.component';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  favorites: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  getGenre(Name: string, Description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: { Name, Description },
      width: '500px'
    });
  }

  getDirector(Name: string, Bio: string): void {
    this.dialog.open(DirectorCardComponent, {
      data: { Name, Bio },
      width: '500px'
    });
  }

  getSynopsis(Description: string): void {
    this.dialog.open(SynopsisCardComponent, {
      data: { Description },
      width: '500px'
    });
  }

  addFavorite(_id: string): void {
    this.fetchApiData.addFavorite(_id).subscribe((resp: any) => {
    });
  }
}

