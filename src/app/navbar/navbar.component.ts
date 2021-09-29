import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public router: Router
  ) { }

  ngOnInit(): void {
  }


  openProfile(): void {
    this.dialog.open(UserProfileComponent, {
      width: '500px'
    });
  }

  openMovies(): void {
    this.router.navigate(['movies']);
  }

  userLogout(): void {
    this.router.navigate(['welcome']);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

}
