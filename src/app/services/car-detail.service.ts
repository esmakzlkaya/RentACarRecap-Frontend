import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetailDto } from '../models/carDetailDto';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarDetailService {

  addedCar:Rental;
  apiUrl = 'https://localhost:44370/api/';
  constructor(private httpClient:HttpClient) { }

  getCarDetailById(carId:number):Observable<ListResponseModel<CarDetailDto>>{
    let newPath= this.apiUrl+"cars/getcardetailbycarid?carId="+carId;
    return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
  }

  getCarDetailByIdSingle(carId:number):Observable<SingleResponseModel<CarDetailDto>>{
    let newPath=this.apiUrl+"cars/getcardetailbycaridsingle?carId="+carId;
    return this.httpClient.get<SingleResponseModel<CarDetailDto>>(newPath);
  }
  
}
