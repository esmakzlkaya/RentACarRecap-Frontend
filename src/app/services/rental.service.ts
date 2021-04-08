import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalDetailDto } from '../models/rentalDetailDto';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  apiUrl = 'https://localhost:44347/api/';
  constructor(private httpClient: HttpClient) {}

  getRentals(): Observable<ListResponseModel<Rental>> {
    let newPath=this.apiUrl+"rentals/getall";
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  rentCar(rental:Rental): Observable<ResponseModel>{
    let newPath = this.apiUrl + "rentals/add";
    return this.httpClient.post<ResponseModel>(newPath,rental);

  }
  getRentalsByCarId(carId:number): Observable<SingleResponseModel<Rental>> {
    let newPath=this.apiUrl+"rentals/getallbycarid?carId="+carId;
    return this.httpClient.get<SingleResponseModel<Rental>>(newPath);
  }
  
}
