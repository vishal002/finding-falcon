import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  public response: any;

  constructor(private route: ActivatedRoute) {
    this.response = {};
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((data: any) => {
        this.response.name = data.params.name;
        this.response.timeTaken = data.params.timetaken;
      }
    );
  }

}
