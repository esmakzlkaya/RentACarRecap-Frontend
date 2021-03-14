import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RentalResponseModel } from 'src/app/models/rentalResponseModel';
import { RentalDetailDto } from 'src/app/models/rentalDetailDto';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent implements OnInit {
  apiUrl = 'https://localhost:44347/api/rentals/getallrentaldetails';
  rentalDetails:RentalDetailDto[]=[];
  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.getRentals();
  }
  getRentals() {
    this.httpClient
      .get<RentalResponseModel>(this.apiUrl)
      .subscribe((response) => {
        this.rentalDetails=response.data
      });
  }
}
