import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {

  currentCar:Car;
  emptyCar:Car;
  brands:Brand[]=[];
  colors:Color[]=[];
  dataLoaded=false;
  colorFilterText:string="";
  brandFilterText:string="";
  currentColor:number;
  currentBrand:number;
  constructor(private brandService: BrandService,private colorService: ColorService,private activatedRoute:ActivatedRoute,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getColors();
    this.getBrands();
    this.getFiltersFromParams();
  }
  removeCurrentCar(){
    this.currentCar=this.emptyCar;
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      this.dataLoaded=true;
    });
  }
  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
      this.dataLoaded=true;
    });
  }
  getAllCarsClass(){
    if((!this.currentCar)){
      return "list-group-item list-group-item-info active"
    }else{
      return "list-group-item list-group-item-info"
    }
  }

  isColorSelected(colorId?:number):boolean{
    return this.currentColor===colorId;
  }
  isBrandSelected(brandId?:number):boolean{
    return this.currentBrand===brandId;
  }

  getFiltersFromParams(){
    this.activatedRoute.queryParams.subscribe(params=>{
      if(params["brand"]){
        this.currentBrand===params["brand"];
      }
      if(params["color"]){
        this.currentColor===params["color"];
      }
      this.toastrService.success("Tüm arabalar listelendi.")
    })
  }
  
}
