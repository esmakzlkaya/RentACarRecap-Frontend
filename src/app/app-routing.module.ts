import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentalComponent } from './components/rental/rental.component';

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},
  {path:"?color=:colorId&brand=:brandId",pathMatch:"full",component:CarComponent},
  {path:"cars",pathMatch:"full",component:CarComponent},
  {path:"cars/brands/:brandId",pathMatch:"full",component:CarComponent},
  {path:"cars/colors/:colorId",pathMatch:"full",component:CarComponent},
  {path:"cars/carDetail/:carId",pathMatch:"full",component:CarDetailComponent},
  {path:"cars/rental/:carId",pathMatch:"full",component:RentalComponent},
  {path:"cars/payment/:carId",pathMatch:"full",component:PaymentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
