import { Component, OnInit, Input} from '@angular/core';
import { FetchApiDataService
 } from '../fetch-api-data.service';
import { GenreInfoComponent } from '../genre-info/genre-info.component';
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent implements OnInit {
  @Input()
  //where the movies returned from the API call will be kept
  movies: any [] = [];
  user: any = {};
  userData = { UserID: "", FavoriteMovies: [], Username: ""};
  FavoriteMovies: any[] = [];

  constructor(
   public fetchApiData: FetchApiDataService,
   public dialog: MatDialog,
   public snackBar : MatSnackBar,
   ) { }
  ngOnInit(): void {
    this.getMovies();
    this.getFavMovies();
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

//fetches all movies from API
getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
   if (Array.isArray(resp)) {
    this.movies = resp;
   }
    console.log(this.movies);
    return this.movies;
  });
}

//retrieve favorite movies from the user's local storage
//called on ngOnInit
getFavMovies(): void {
    this.user = this.fetchApiData.getUser();
    this.userData.FavoriteMovies = this.user.FavoriteMovies;
    this.FavoriteMovies = this.user.FavoriteMovies;
    console.log('Users fav movies', this.FavoriteMovies);
  }

//check if a given movie is in the user's list of favorite movies
isFavorite(MovieID: any) : boolean {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user.FavoriteMovies.indexOf(MovieID) >= 0;
}


toggleFavorite(movie: any): void {
  const isFavorite = this.isFavorite(movie);
  isFavorite ?
  this.deleteFavMovies(movie):
  this.addFavMovies(movie);
}

addFavMovies(movie: string): void {
  this.user = this.fetchApiData.getUser();
  this.userData.Username = this.user.Username;
  this.fetchApiData.addFavoriteMovies(movie).subscribe((response) => {
    localStorage.setItem('user', JSON.stringify(response));
    this.getFavMovies();
    this.snackBar.open(`Movie has been added to your favorites`, 'OK', {
      duration: 3000
    });
  });
}


deleteFavMovies(movie: any): void {
  this.user = this.fetchApiData.getUser();
  this.userData.Username = this.user.Username;
  this.fetchApiData.deleteFavoriteMovies(movie).subscribe((response) => {
    localStorage.setItem('user', JSON.stringify(response));
    this.getFavMovies();
    this.snackBar.open(`Movie has been removed from your favorites`, 'OK', {
      duration: 3000
      });
    });
  }
}