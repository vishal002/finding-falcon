import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-vehical-selection',
  templateUrl: './vehical-selection.component.html',
  styleUrls: ['./vehical-selection.component.scss']
})
export class VehicalSelectionComponent implements OnInit {
  @Input() vehicalArr;
  @Input() selectedPlanetName;
  @Output() onVehicalSelection = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onCheckboxChange(event, param) {
    if (event.target.checked) {
      this.onVehicalSelection.emit(param);
    }
  }

}
