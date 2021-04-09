import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';
@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {

  colorUpdateForm: FormGroup;
  colors: Color[] = [];
  currentColor:Color;
  colorName:string;
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private colorService: ColorService,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params['colorId']){
        this.getcolorById(params['colorId']);
      }
    })
    this.createColorUpdateForm();
  }
  createColorUpdateForm() {
    this.colorUpdateForm = this.formBuilder.group({
      id:[''],
      name: ['', Validators.required]
    });
  }

  update() {
    if (this.colorUpdateForm.valid) {
      this.colorUpdateForm.value['id']=this.currentColor.id;
      let colorUpdateModel = Object.assign({}, this.colorUpdateForm.value);
      this.colorService.update(colorUpdateModel).subscribe(
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
  getcolorById(colorId:number) {
    this.colorService.getColorById(colorId).subscribe((response) => {
      this.currentColor = response.data;
       this.colorName=this.currentColor.name;
    });
  }
}