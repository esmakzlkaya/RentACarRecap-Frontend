import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {
  carUpdateForm: FormGroup;
  currentCar:Car;
  brandId:number;
  colorId:number;
  modelYear:number;
  dailyPrice:number;
  description:string;
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private carService: CarService,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params['carId']){
        this.getCarById(params['carId']);
      }
    })
    this.createCarUpdateForm();
  }
  createCarUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      id:[''],
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  update() {
    if (this.carUpdateForm.valid) {
      this.carUpdateForm.value['id']=this.currentCar.id;
      let carUpdateModel = Object.assign({}, this.carUpdateForm.value);
      this.carService.update(carUpdateModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
        },
        (responseError) => {
           if(responseError.error.Errors.length>0){
            for(let i=0;i<responseError.error.Errors.length;i++){
              this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası")
            }
          } 
          });
    } else {
      this.toastrService.error('Formda eksik alanlar var', 'Dikkat');
    }
  }
  getCarById(carId:number) {
    this.carService.getCarById(carId).subscribe((response) => {
      this.currentCar = response.data;
      this.brandId=this.currentCar.brandId;
      this.colorId=this.currentCar.colorId;
      this.modelYear=this.currentCar.modelYear;
      this.dailyPrice=this.currentCar.dailyPrice;
      this.description=this.currentCar.description;
    });
  }
}
