import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CarResponseModel } from 'src/app/models/carResponseModel';
import { CarDetailDto } from 'src/app/models/carDetailDto';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  
  carDetails:CarDetailDto[]=[];
  apiUrl = 'https://localhost:44347/api/cars/getallcardetails';
  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.getCars();
  }
  getCars() {
    this.httpClient
      .get<CarResponseModel>(this.apiUrl)
      .subscribe((response) => {
        this.carDetails=response.data
      });
  }
}
