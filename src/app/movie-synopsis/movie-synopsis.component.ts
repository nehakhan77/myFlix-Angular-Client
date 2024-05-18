import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-synopsis',
  templateUrl: './movie-synopsis.component.html',
  styleUrl: './movie-synopsis.component.scss'
})
export class MovieSynopsisComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)

  public data : {
    Description: string
  })
  { }

ngOnInit(): void {
}

}
