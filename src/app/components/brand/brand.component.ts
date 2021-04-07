import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
import { ColorComponent } from '../color/color.component';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent implements OnInit {

  currentBrand:Brand;
  emptyBrand:Brand;
  brands: Brand[] = [];
  dataLoaded=false;
  constructor(private brandService: BrandService) {}

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      this.dataLoaded=true;
    });
  }
  setCurrentBrand(brand:Brand){
    this.currentBrand=brand;
  }
  removeCurrentBrand(){
    this.currentBrand=this.emptyBrand;
  }
  getCurrentBrandClass(brand:Brand){
    if(this.currentBrand==brand){
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
  }
  getAllCarsClass(){
    if((!this.currentBrand)){
      return "list-group-item list-group-item-info active"
    }else{
      return "list-group-item list-group-item-info"
    }
  }
}
