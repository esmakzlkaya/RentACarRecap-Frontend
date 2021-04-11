import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from 'src/app/models/brand';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl = 'https://localhost:44370/api/';
  
  constructor(private httpClient: HttpClient) { }

  getBrands() :Observable<ListResponseModel<Brand>> {
    let newPath=this.apiUrl+"brands/getall";
   return  this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }
  getBrandById(brandId:number) :Observable<SingleResponseModel<Brand>> {
    let newPath=this.apiUrl+"brands/getbyid?id="+brandId;
   return  this.httpClient.get<SingleResponseModel<Brand>>(newPath);
  }
  add(brand:Brand) :Observable<ResponseModel>{
    let newPath=this.apiUrl+"brands/add";
    return this.httpClient.post<ResponseModel>(newPath,brand);
  }
  update(brand:Brand) :Observable<ResponseModel>{
    let newPath=this.apiUrl+"brands/update";
    return this.httpClient.post<ResponseModel>(newPath,brand);
  }
}
