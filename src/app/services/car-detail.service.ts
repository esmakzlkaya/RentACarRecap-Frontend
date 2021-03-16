import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetailDto } from '../models/carDetailDto';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarDetailService {

  apiUrl = 'https://localhost:44347/api/cars/getallcardetails';
  constructor(private htppClient:HttpClient) { }

  getCarDetails():Observable<ListResponseModel<CarDetailDto>>{
    return this.htppClient.get<ListResponseModel<CarDetailDto>>(this.apiUrl);
  }
}
