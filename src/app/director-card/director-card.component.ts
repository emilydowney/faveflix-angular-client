import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-card',
  templateUrl: './director-card.component.html',
  styleUrls: ['./director-card.component.scss']
})

/**
 * Component displaying director information
 */
export class DirectorCardComponent implements OnInit {

  constructor(

    /**
     * Director details from movie object using Inject
     */
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
      Bio: string;
    }
  ) { }

  ngOnInit(): void {
  }

}
