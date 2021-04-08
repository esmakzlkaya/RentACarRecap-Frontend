import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  currentCar: Car;
  emptyCar: Car;
  cars: Car[] = [];
  carDetail: CarDetailDto[] = [];
  dataLoaded = false;
  filterText: string = '';
  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['brand'] && params['color']) {
        this.getCarByBrandIdAndColorId(params['brand'], params['color']);
      } else if (params['colorId']) {
        this.getCarsByColor(params['colorId']);
      } else if (params['brandId']) {
        this.getCarsByBrand(params['brandId']);
      } else {
        this.getCars();
      }
    });
  }
  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  getCarsByColor(colorId: number) {
    this.carService.getCarsByColor(colorId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  getCarsByBrand(brandId: number) {
    this.carService.getCarsByBrand(brandId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  setCurrentCar(car: Car) {
    this.currentCar = car;
  }
  getCurrentCarClass(car: Car) {
    if (this.currentCar == car) {
      return 'table-primary';
    } else {
      return '';
    }
  }
  getCarByBrandIdAndColorId(brandId: number, colorId: number) {
    this.carService
      .getCarByBrandIdAndColorId(brandId, colorId)
      .subscribe((response) => {
        this.cars = response.data;
        this.dataLoaded = true;
      });
  }
}
