import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiURL = 'https://a-movies-api.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})

// Logic for User Registration
export class FetchApiDataService {
  constructor(private http: HttpClient) {
  }
  // User registration
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiURL + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }
  // User login
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiURL + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }
  // Retrieve all movies
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiURL + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${token}`,
        })
    }).pipe(
      catchError(this.handleError)
    );
  }
  // Retrieves one movie
  getMovie(title: any): Observable<any> {
    console.log(title);
    return this.http.get(apiURL + 'movies/:title', title).pipe(
      catchError(this.handleError)
    );
  }
  // Retrieves director
  getDirector(name: any): Observable<any> {
    console.log(name);
    return this.http.get(apiURL + 'directors/:name', name).pipe(
      catchError(this.handleError)
    );
  }
  // Retrieves genre
  getGenre(genre: any): Observable<any> {
    console.log(genre);
    return this.http.get(apiURL + 'genres/:name', genre).pipe(
      catchError(this.handleError)
    );
  }
  // Gets single user
  getUser(userDetails: any): Observable<any> {
    let token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.get(apiURL + `users/${username}`, {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${token}`,
        })
    }).pipe(
      catchError(this.handleError)
    );
  }
  // Retrieves user's favorites
  getFavorites(favorites: any): Observable<any> {
    const username = localStorage.getItem('user');
    let token = localStorage.getItem('token');
    return this.http.get(apiURL + `users/${username}/favorites`, {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${token}`,
        })
    }).pipe(
      catchError(this.handleError)
    );
  }
  // Adds favorite to list
  addFavorite(_id: string): Observable<any> {
    const username = localStorage.getItem('user');
    let token = localStorage.getItem('token');
    return this.http.post(apiURL + `users/${username}/favorites/` + _id, {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${token}`,
        })
    }).pipe(
      catchError(this.handleError)
    );
  }
  // Removes favorite from list
  deleteFavorite(movieID: any): Observable<any> {
    console.log(movieID);
    const username = localStorage.getItem('user');
    return this.http.delete(apiURL + `users/${username}/favorites/:movieID`, movieID).pipe(
      catchError(this.handleError)
    );
  }

  // Edits user information
  editUser(userDetails: any): Observable<any> {
    let token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.put(apiURL + `users/${username}`, {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${token}`,
        })
    }).pipe(
      catchError(this.handleError)
    );
  }
  // Removes user from DB
  deleteUser(userDetails: any): Observable<any> {
    let token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.delete(apiURL + `users/${username}`, {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${token}`,
        })
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`
      );
    }
    return throwError(
      'Something bad happened; please try again later.'
    );
  }
}


