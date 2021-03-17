import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalDetailDto } from '../models/rentalDetailDto';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  private apiUrl: string = environment.apiUrl;
  
  constructor(private httpClient: HttpClient) {
    this.apiUrl = this.apiUrl + 'rentals/getallrentaldetails';
  }

  getRentals():Observable<ListResponseModel<RentalDetailDto>> {
    return this.httpClient.get<ListResponseModel<RentalDetailDto>>(this.apiUrl)
  }
}
