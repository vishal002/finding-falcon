import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { PlanetsService } from '../services/planets.service';
import { VehiclesService } from '../services/vehicles.service';
import { SearchService } from '../services/search.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public planets: any;
  public vehicles: any;
  public searchForm: FormGroup;
  public timetaken: number;
  public selectedPlanetDetail: any;

  constructor(private fb: FormBuilder,
              private planetsService: PlanetsService,
              private vehiclesService: VehiclesService,
              private searchService: SearchService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      destination1: [''],
      destination2: [''],
      destination3: [''],
      destination4: [''],
      vehicles: this.fb.array([]),
      planets: this.fb.array([])
    });
    this.getPlanetsList();
    this.getVehiclesList();
    this.timetaken = 0;
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
    this.selectedPlanetDetail = planet;
    const checkArrayPlanets: FormArray = this.searchForm.get('planets') as FormArray;
    if (planet.name) {
      checkArrayPlanets.push(this.fb.control(planet.name));
    }
  }
  //
  getSelectedVehicalDetails(event, param) {
    if (event) {
      const checkArrayVehicle: FormArray = this.searchForm.get('vehicles') as FormArray;
      this.vehicles.forEach( vehicle => {
        if (vehicle.name === event.name) {
          if (vehicle.total_no > 0) {
            vehicle.total_no = vehicle.total_no - 1;
            this.timetaken = this.timetaken + (Number(this.selectedPlanetDetail.distance) / Number(event.speed));
            checkArrayVehicle.push(this.fb.control(event.name));
          }
        }
      });
    }
  }
  //
  findFalcone() {
    const objectToSendForSearch: any = {};
    objectToSendForSearch.planet_names = this.searchForm.get('planets').value;
    objectToSendForSearch.vehicle_names = this.searchForm.get('vehicles').value;
    this.authService.getAuthToken().subscribe( (token: any) => {
      objectToSendForSearch.token = token.token;
      this.searchService.findFalcone(objectToSendForSearch).subscribe( (response: any) => {
        if (response.status === 'success') {
          this.router.navigate(['/results/', response.planet_name, this.timetaken]);
        } else {
          console.log('error at findingFalcone');
        }
      }, error => {
        console.log('error at findingFalcone', error);
      });
    }, errors => {
      console.log('error at getting token', errors);
    });
  }
}
