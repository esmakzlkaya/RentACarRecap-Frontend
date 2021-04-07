import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css'],
})
export class ColorComponent implements OnInit {
  
  dataLoaded=false;
  currentColor:Color;
  emptyColor:Color;
  colors: Color[] = [];
  constructor(private colorService: ColorService) {}

  ngOnInit(): void {
    this.getColors();
  }
  
  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
      this.dataLoaded=true;
    });
  }
  setCurrentColor(color:Color){
    this.currentColor=color;
  }
  removeCurrentColor(){
    this.currentColor=this.emptyColor;
  }
  getCurrentColorClass(color:Color){
    if(this.currentColor==color){
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
  }
  getAllCarsClass(){
    if((!this.currentColor)){
      return "list-group-item list-group-item-info active"
    }else{
      return "list-group-item list-group-item-info"
    }
  }
}
