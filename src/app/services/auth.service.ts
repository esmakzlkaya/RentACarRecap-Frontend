import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { User } from '../models/user';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  email:string;
  apiUrl = 'https://localhost:44370/api/';
  constructor(private httpClient:HttpClient,private localStorageService:LocalStorageService,private router:Router) { }

  login(login:LoginModel):Observable<SingleResponseModel<TokenModel>>{
    let newPath=this.apiUrl+"auth/login"
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,login);
  }
  
  isAuthenticated(){
    if(localStorage.getItem("token")!==null){
      return true;
    }else{
      return false;
    }
  }

  register(register:RegisterModel):Observable<SingleResponseModel<TokenModel>>{
    let newPath=this.apiUrl+"auth/register"
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,register);
  }
  logout() {
    this.localStorageService.remove('token');
    this.localStorageService.remove('email');
    this.router.navigate([""]);
   // this.deleteUserDetail();
  }

}
