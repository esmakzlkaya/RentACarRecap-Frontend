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
import { BrandService } from 'src/app/services/brand.service';
@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {
  brandUpdateForm: FormGroup;
  brands: Brand[] = [];
  currentBrand:Brand;
  brandName:string;
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private brandService: BrandService,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params['brandId']){
        this.getBrandById(params['brandId']);
      }
    })
    this.createBrandUpdateForm();
  }
  createBrandUpdateForm() {
    this.brandUpdateForm = this.formBuilder.group({
      id:[''],
      name: ['', Validators.required]
    });
  }

  update() {
    if (this.brandUpdateForm.valid) {
      this.brandUpdateForm.value['id']=this.currentBrand.id;
      let brandUpdateModel = Object.assign({}, this.brandUpdateForm.value);
      this.brandService.update(brandUpdateModel).subscribe(
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
  getBrandById(brandId:number) {
    this.brandService.getBrandById(brandId).subscribe((response) => {
      this.currentBrand = response.data;
       this.brandName=this.currentBrand.name;
    });
  }
}
