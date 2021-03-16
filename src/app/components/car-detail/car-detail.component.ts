import { Component, OnInit } from '@angular/core';
import { CarDetailDto } from '../../models/carDetailDto';
import { CarDetailService } from '../../services/car-detail.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  dataLoaded=false;
  carDetails:CarDetailDto[]=[];
  constructor(private carDetailService:CarDetailService) { }

  ngOnInit(): void {
    this.getCarDetails();
  }
  getCarDetails(){
    this.carDetailService.getCarDetails().subscribe(response=>{
      this.carDetails=response.data;
      this.dataLoaded=true;
    })
  }

}
