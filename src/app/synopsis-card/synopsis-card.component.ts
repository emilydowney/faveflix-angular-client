import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-synopsis-card',
  templateUrl: './synopsis-card.component.html',
  styleUrls: ['./synopsis-card.component.scss']
})
/**
 * Component displaying synopsis information
 */
export class SynopsisCardComponent implements OnInit {

  constructor(
    /**
    * Synopsis details from movie object using Inject
    */
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Description: string;
    }
  ) { }

  ngOnInit(): void {
  }

}