import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PlanetsService } from '../services/planets.service';
import { VehiclesService } from '../services/vehicles.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public planets: any;
  public vehicles: any;
  public searchForm: FormGroup;

  constructor(private fb: FormBuilder,
              private planetsService: PlanetsService,
              private vehiclesService: VehiclesService) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      destination1: [''],
      destination2: [''],
      destination3: [''],
      destination4: ['']
    });
    this.getPlanetsList();
    this.getVehiclesList();
  }
  // get list for planets
  getPlanetsList() {
    this.planetsService.getPlanets()
      .subscribe( (response: any) => {
        this.planets = response;
      }, error => {
        console.log( 'error at getPlanetsList: ', error);
      });
  }
  // get list for vehicles
  getVehiclesList() {
    this.vehiclesService.getVehicles()
      .subscribe( (response: any) => {
        this.vehicles = response;
      }, error => {
        console.log('error at getVehiclesList: ', error);
      });
  }
  //
  setSelectedPlanet(key, planet) {
    const obj = {};
    obj[key] = planet.name;
    this.searchForm.patchValue(obj);
  }

}
