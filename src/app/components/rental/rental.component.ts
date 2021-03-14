import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RentalResponseModel } from 'src/app/models/rentalResponseModel';
import { RentalDetailDto } from 'src/app/models/rentalDetailDto';
import { RentalService } from 'src/app/services/rental/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent implements OnInit {
  dataLoaded=false;
  rentalDetails:RentalDetailDto[]=[];
  constructor(private rentalService:RentalService) {}

  ngOnInit(): void {
    this.getRentals();
  }
  getRentals() {
    this.rentalService.getRentals().subscribe((response) => {
        this.rentalDetails=response.data
        this.dataLoaded=true;
      });
  }
}
