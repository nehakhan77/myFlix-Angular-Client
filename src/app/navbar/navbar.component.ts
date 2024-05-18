import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

constructor(
  private router: Router,
  public snackBar: MatSnackBar,
 ) { }

 ngOnInit(): void { 
 }

 launchMoviePage(): void {
  this.router.navigate(['Movies']);
 }

 launchProfilePage(): void {
  this.router.navigate(['Profile']);
 }

 logoutUser(): void {
      localStorage.clear();
      this.snackBar.open('You have successfully logged out!', 'OK', {
        duration: 3000
    });
      this.router.navigate(['Welcome']);
  }
 }
