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
/**
 * Component containing all movies
 */
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
  /**
   * Function to retrieve all movies in db
   * @returns array of movies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }
  /**
   * Function to retrieve genre information
   * @param Name 
   * @param Description 
   */
  getGenre(Name: string, Description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: { Name, Description },
      width: '500px'
    });
  }
  /**
   * Function to retrieve director information
   * @param Name 
   * @param Bio 
   */
  getDirector(Name: string, Bio: string): void {
    this.dialog.open(DirectorCardComponent, {
      data: { Name, Bio },
      width: '500px'
    });
  }
  /**
   * Function to retrieve movie synopsis
   * @param Description 
   */
  getSynopsis(Description: string): void {
    this.dialog.open(SynopsisCardComponent, {
      data: { Description },
      width: '500px'
    });
  }
  /**
   * Function to add a movie to user's favorites
   * @param _id 
   * @param Title 
   */
  addFavorite(_id: string, Title: string): void {
    this.fetchApiData.addFavorite(_id).subscribe((res: any) => {
      this.snackBar.open(`${Title} has been added to favorties`, 'OK', {
        duration: 3000,
      })
    })
  }
}

