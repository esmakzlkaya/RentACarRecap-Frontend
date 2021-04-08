import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CarImage } from 'src/app/models/carImage';
import { Rental } from 'src/app/models/rental';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarImagesService } from 'src/app/services/car-images.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  imgPath: string = 'https://localhost:44347';
  dataLoaded = false;
  rentalByCarId:Rental;
  carDetails: CarDetailDto[] = [];
  carImages: CarImage[] = [];
  filterText: string = '';
  currentCar: Car;
  dateTimeNow: Date = new Date();
  rentStartDate: Date;
  rentEndDate: Date;
  rentalAvailable: boolean=false;
  constructor(
    private carDetailService: CarDetailService,
    private carImageService: CarImagesService,
    private activatedRoute: ActivatedRoute,
    private rentalService: RentalService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getCarDetailByCarId(params['carId']);
      this.getCarImagesByCarId(params['carId']);
      this.getRentalsByCarId(params['carId']);
    });
  }
  
  getRentalsByCarId(carId: number) {
    this.rentalService.getRentalsByCarId(carId).subscribe((response) => {
      this.rentalByCarId = response.data;
      if (this.rentalByCarId.returnDate !== null){
        this.rentalAvailable = true;
      }
    });
  }
  getCarDetailByCarId(carId: number) {
    this.carDetailService.getCarDetailById(carId).subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });
  }

  getCarImagesByCarId(carId: number) {
    this.carImageService.getCarImagesByCarId(carId).subscribe((response) => {
      this.carImages = response.data;
      this.dataLoaded = true;
    });
  }
}
