import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {

  currentCar:Car;
  emptyCar:Car;
  constructor() { }

  ngOnInit(): void {
  }
  removeCurrentCar(){
    this.currentCar=this.emptyCar;
  }

  getAllCarsClass(){
    if((!this.currentCar)){
      return "list-group-item list-group-item-info active"
    }else{
      return "list-group-item list-group-item-info"
    }
  }
}
