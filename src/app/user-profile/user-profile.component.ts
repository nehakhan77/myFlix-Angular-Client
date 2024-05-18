import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { GenreInfoComponent } from '../genre-info/genre-info.component';
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {

  @Input() userProfileData = { Username: '', Password: '', Email: '', Birthday: '', FavoriteMovies: [] };
  movies:  any [] = [];
  FavoriteMovies: any [] = [];
  user: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router
   ) { }

  ////once component has mounted these functions must be invoked, including the profile info of the user & their list of fav movies
  ngOnInit(): void {
    this.getUserProfile();
    this.getUserFavoriteMovies();
  }

  getUserProfile(): void {
    this.user = this.fetchApiData.getUser();
    this.userProfileData.Username = this.user.Username;
    this.userProfileData.Password = this.user.Password;
    this.userProfileData.Email = this.user.Email;
    this.userProfileData.Birthday = this.user.Birthday;
    this.fetchApiData.getAllMovies().subscribe(response => {
      this.FavoriteMovies = response.filter((movie: any) => this.user.FavoriteMovies.includes(movie._id));
    });
  }

  getUserFavoriteMovies(): void {
    this.user = this.fetchApiData.getUser();
    this.userProfileData.FavoriteMovies = this.user.FavoriteMovies;
    this.FavoriteMovies = this.user.FavoriteMovies;
    console.log(`List of users favorite movies: ${this.FavoriteMovies}`);
  }

  deleteUser(): void {
      this.router.navigate(['Welcome']).then(() => {
        localStorage.clear();
        this.snackBar.open('Account has been deleted.', 'OK', {
          duration: 3000,
        });
      })
      this.fetchApiData.deleteUser().subscribe((response) => {
        console.log(response);
      });
  }

  updateUser(): void {
    this.fetchApiData.editUser(this.userProfileData).subscribe((response) => {
      console.log('Updated User Information', response);
      localStorage.setItem('user', JSON.stringify(response));
      this.snackBar.open('User information successfully updated!', 'OK', {
        duration: 2000
      });
    });
  }

  openGenreDialog( Name: String, Description: String): void {
    this.dialog.open(GenreInfoComponent, {
      data: {
        Name: Name,
        Description: Description
      },
      width: '400px'
    });
  }

  openDirectorDialog( Name: String, Bio: String, Birth: String, Death: String): void {
    this.dialog.open(DirectorInfoComponent, {
      data: {
        Name: Name,
        Bio: Bio,
        Birth: Birth, 
        Death: Death
      },
      width: '400px'
    });
  }
  
  openSynopsisDialog( Description: String): void {
    this.dialog.open(MovieSynopsisComponent, {
      data: {
        Description: Description
      },
      width: '400px'
    });
  }

}
  
      
    

