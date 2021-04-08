import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Rental } from 'src/app/models/rental';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  paymentForm: FormGroup;
  expirationDate: Date;
  rentStartDate: Date;
  rentEndDate: Date;
  currentCar: Car;

  constructor(
    private formBuilder: FormBuilder,
    private paymentService: PaymentService,
    private toastrService: ToastrService,
    private rentalService:RentalService
  ) {}

  ngOnInit(): void {
    this.createPaymentForm();
  }

  createPaymentForm() {
    this.paymentForm = this.formBuilder.group({
      customerName: ['', Validators.required],
      creditCardNo: ['', Validators.required],
      expirationDate: ['', Validators.required],
      cvv: ['', Validators.required],
      cardType: ['', Validators.required],
      installment: ['', Validators.required],
    });
  }

  pay() {
    if (this.paymentForm.valid) {
      let paymentModel = Object.assign({}, this.paymentForm.value);
      this.paymentService.pay(paymentModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');

        },
        (responseError) => {
          if (responseError.error != null) {
            this.toastrService.error(responseError.error.message, 'Hata');
          }
        }
      );
    } else {
      this.toastrService.error('Formda eksik alanlar var', 'Dikkat');
    }
  }

  rentCar() {
    let addedRental: Rental = {
      carId: this.currentCar.id,
      customerId: 0,
      rentStartDate: this.rentStartDate,
      rentEndDate: this.rentEndDate,
    };
    this.rentalService.rentCar(addedRental).subscribe((response) => {
      this.toastrService.success(response.message,"Başarılı");
    },responseError=>{
       if(responseError.error!=null){
          this.toastrService.error(responseError.error.message,"Hata")
      }
    });
  }
}
