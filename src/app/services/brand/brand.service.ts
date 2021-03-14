import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BrandResponseModel } from 'src/app/models/brandResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl = 'https://localhost:44347/api/brands/getall';
  
  constructor(private httpClient: HttpClient) { }

  getBrands() :Observable<BrandResponseModel> {
   return  this.httpClient.get<BrandResponseModel>(this.apiUrl);
  }
}
