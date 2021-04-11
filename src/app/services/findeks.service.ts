import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FindeksModel } from '../models/findeks';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class FindeksService {

  apiUrl='https://localhost:44370/api/';

  constructor(private httpClient: HttpClient) {}

  getById(userId:number): Observable<SingleResponseModel<FindeksModel>> {
    let newPath=this.apiUrl+"findeks/getbyuserid?userId="+userId;
    return this.httpClient.get<SingleResponseModel<FindeksModel>>(newPath);
  }
}
