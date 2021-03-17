import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from 'src/app/models/brand';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private apiUrl: string = environment.apiUrl;
  
  constructor(private httpClient: HttpClient) {
    this.apiUrl = this.apiUrl + 'brands/getall';
  }

  getBrands() :Observable<ListResponseModel<Brand>> {
    return  this.httpClient.get<ListResponseModel<Brand>>(this.apiUrl);
  }
}
