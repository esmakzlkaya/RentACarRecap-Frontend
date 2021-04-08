import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetailDto } from '../models/carDetailDto';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';

@Injectable({
  providedIn: 'root'
})
export class CarDetailService {

  addedCar:Rental;
  apiUrl = 'https://localhost:44347/api/';
  constructor(private httpClient:HttpClient) { }

  getCarDetailById(carId:number):Observable<ListResponseModel<CarDetailDto>>{
    let newPath= this.apiUrl+"cars/getcardetailbycarid?carId="+carId;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
  }
  
}
