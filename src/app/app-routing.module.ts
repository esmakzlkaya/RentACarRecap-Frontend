import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { FindeksComponent } from './components/findeks/findeks.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalComponent } from './components/rental/rental.component';
import { UserComponent } from './components/user/user.component';
import { LoggedInGuard } from './guards/logged-in.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},
  {path:"?color=:colorId&brand=:brandId",pathMatch:"full",component:CarComponent},
  {path:"cars",pathMatch:"full",component:CarComponent},
  {path:"cars/brands/:brandId",pathMatch:"full",component:CarComponent},
  {path:"cars/colors/:colorId",pathMatch:"full",component:CarComponent},
  {path:"cars/carDetail/:carId",pathMatch:"full",component:CarDetailComponent},
  {path:"cars/rental/:carId",pathMatch:"full",component:RentalComponent},
  {path:"cars/payment/:carId",pathMatch:"full",component:PaymentComponent,canActivate:[LoginGuard]},
  {path:"admin/caradd",pathMatch:"full",component:CarAddComponent,canActivate:[LoginGuard]},
  {path:"admin/brandadd",pathMatch:"full",component:BrandAddComponent,canActivate:[LoginGuard]},
  {path:"admin/coloradd",pathMatch:"full",component:ColorAddComponent,canActivate:[LoginGuard]},
  {path:"admin/carupdate/:carId",pathMatch:"full",component:CarUpdateComponent,canActivate:[LoginGuard]},
  {path:"admin/brandupdate/:brandId",pathMatch:"full",component:BrandUpdateComponent,canActivate:[LoginGuard]},
  {path:"admin/colorupdate/:colorId",pathMatch:"full",component:ColorUpdateComponent,canActivate:[LoginGuard]},
  {path:"login",pathMatch:"full",component:LoginComponent},
  {path:"register",pathMatch:"full",component:RegisterComponent},
  {path:"profile/update/:userId",pathMatch:"full",component:UserComponent,canActivate:[LoginGuard]},
  {path:"profile/findeks/:userId",pathMatch:"full",component:FindeksComponent,canActivate:[LoginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
