import { Component, OnInit } from '@angular/core';
import { FetchApiDataService
 } from '../fetch-api-data.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent implements OnInit {
  //where the movies returned from the API call will be kept
  movies: any [] = [];
  constructor( public fetchApiData: FetchApiDataService) { }
  ngOnInit(): void {
    this.getMovies();
  }

getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
    this.movies = resp;
    console.log(this.movies);
    return this.movies;
  });
}
}
