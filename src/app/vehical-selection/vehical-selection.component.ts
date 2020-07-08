import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-vehical-selection',
  templateUrl: './vehical-selection.component.html',
  styleUrls: ['./vehical-selection.component.scss']
})
export class VehicalSelectionComponent implements OnInit {
  @Input() vehicalArr;
  @Input() selectedPlanetName;
  constructor() { }

  ngOnInit(): void {
  }

}
