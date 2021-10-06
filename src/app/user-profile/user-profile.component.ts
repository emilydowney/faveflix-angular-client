import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
/**
 * Component displaying the user's profile
 */
export class UserProfileComponent implements OnInit {
  user: any = {};

  @Input() data = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: ''
  }

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router,
    public dialogRef: MatDialogRef<UserProfileComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getUser();
  }
  /**
   * Function to retrieve a certain user
   * @returns {object} 
   */
  getUser(): void {
    let user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.user = resp;
    });

  }
  /**
   * Function to update the user information
   * @returns message
   */
  updateUser(): void {
    this.fetchApiData.editUser(this.data).subscribe((res) => {
      this.dialogRef.close();
      localStorage.setItem('user', res.Username)
      this.snackBar.open(this.data.Username, 'Successfully updated user.', {
        duration: 3000
      });
    })
  }
  /**
   * Function to open a user's favorites
   */
  openFavorites(): void {
    this.router.navigate(['favorites']);
    this.dialogRef.close();
  }
}
