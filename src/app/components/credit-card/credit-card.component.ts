import { Component, OnInit } from '@angular/core';
import { CreditCardService } from 'src/app/services/credit-card.service';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent implements OnInit {

  
  constructor(private creditCardService:CreditCardService) { }

  ngOnInit(): void {
  }

  getAll(){
    this.creditCardService.getAllCreditCards().subscribe(response=>{
      
    })
  }
}
