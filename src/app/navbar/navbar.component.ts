import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
/**
 * Component displaying the navigation bar
 */
export class NavbarComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  /**
   * Function to open the user profile
   */
  openProfile(): void {
    this.dialog.open(UserProfileComponent, {
      width: '500px'
    });
  }
  /**
   * Function to open movies list
   */
  openMovies(): void {
    this.router.navigate(['movies']);
  }
  /**
   * Function to open user's favorite movies
   */
  openFavorites(): void {
    this.router.navigate(['favorites']);
  }
  /**
   * Function to logout the user
   */
  userLogout(): void {
    this.router.navigate(['welcome']);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

}
