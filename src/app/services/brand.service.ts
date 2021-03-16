import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from 'src/app/models/brand';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl = 'https://localhost:44347/api/brands/getall';
  
  constructor(private httpClient: HttpClient) { }

  getBrands() :Observable<ListResponseModel<Brand>> {
   return  this.httpClient.get<ListResponseModel<Brand>>(this.apiUrl);
  }
}
