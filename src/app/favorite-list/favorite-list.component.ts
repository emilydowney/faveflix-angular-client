import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

const user = localStorage.getItem('user');

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.scss']
})

export class FavoriteListComponent implements OnInit {
  user: any = {};
  favorites: any = [];
  movies: any = [];
  list: any = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavorites();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.filterFaves();
    });
  }

  getFavorites(): void {
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.list = resp.Favorites;
      return this.list;
    })
  }

  filterFaves(): void {
    this.movies.forEach((movie: any) => {
      if (this.list.includes(movie._id)) {
        this.favorites.push(movie);
      }
    });
    return this.favorites;
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

  addFavorite(_id: string, Title: string): void {
    this.fetchApiData.addFavorite(_id).subscribe((res: any) => {
      this.snackBar.open(`${Title} has been added to favorties`, 'OK', {
        duration: 3000,
      })
    })
  }

  removeFavorite(id: string, title: string): void {
    this.fetchApiData.removeFavorite(id).subscribe((resp: any) => {
      this.snackBar.open(`Movie has been removed from favorites.`, 'OK', {
        duration: 2000,
      })
      setTimeout(function () {
        window.location.reload()
      }, 2000);
    });
    return this.getFavorites();
  }

  favoriteStatus(_id: any): any {
    if (this.list.includes(_id)) {
      return true;
    } else {
      return false;
    }
  }

}
