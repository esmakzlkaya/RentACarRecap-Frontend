import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetailDto } from '../models/carDetailDto';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarDetailService {

  private apiUrl: string = environment.apiUrl;
  
  constructor(private htppClient:HttpClient) {
    this.apiUrl = this.apiUrl + 'cars/getallcardetails';
  }

  getCarDetails():Observable<ListResponseModel<CarDetailDto>>{
    return this.htppClient.get<ListResponseModel<CarDetailDto>>(this.apiUrl);
  }
}
