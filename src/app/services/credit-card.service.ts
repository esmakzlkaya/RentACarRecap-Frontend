import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  apiUrl = 'https://localhost:44370/api/';
  constructor(private httpClient:HttpClient) { }

  getAllCreditCards():Observable<ListResponseModel<CreditCard>>{
    let newPath=this.apiUrl+"creditcards/getall";
   return  this.httpClient.get<ListResponseModel<CreditCard>>(newPath);
  }

  getById(id:number):Observable<SingleResponseModel<CreditCard>>{
    let newPath=this.apiUrl+"creditCards/getbyid";
   return this.httpClient.get<SingleResponseModel<CreditCard>>(newPath);
  }

  add(creditCard:CreditCard):Observable<ResponseModel>{
    let newPath=this.apiUrl+"creditCards/add";
    return this.httpClient.post<ResponseModel>(newPath,creditCard);
  }

  delete(id:number):Observable<ResponseModel>{
    let newPath=this.apiUrl+"creditCards/delete";
    return this.httpClient.post<ResponseModel>(newPath,id);
  }
}
