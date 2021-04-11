import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleDataModel } from '../models/singleDataModel';
import { User } from '../models/user';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = 'https://localhost:44370/api/';
  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  getCustomerByEmail(): Observable<User> {
    let email = localStorage.getItem('email');
    let newPath = this.apiUrl + 'users/getbyemail?email=' + email;
    return this.httpClient.get<User>(newPath);
  }
  getById(id:number): Observable<User> {
    let newPath = this.apiUrl + 'users/getbyid?id=' + id;
    return this.httpClient.get<User>(newPath);
  }

  getAll(): Observable<ListResponseModel<User>> {
    let newPath = this.apiUrl + 'users/getall';
    return this.httpClient.get<ListResponseModel<User>>(newPath);
  }

  update(userId:number):Observable<ResponseModel> {
    let newPath=this.apiUrl+"users/update";
    return this.httpClient.post<ResponseModel>(newPath,userId);
  }

  delete(userId:number):Observable<ResponseModel> {
    let newPath=this.apiUrl+"users/delete";
    return this.httpClient.post<ResponseModel>(newPath,userId);
  }
}
