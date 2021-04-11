import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarDetailDto } from 'src/app/models/carDetailDto';
import { CarImage } from 'src/app/models/carImage';
import { Rental } from 'src/app/models/rental';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarImagesService } from 'src/app/services/car-images.service';
import { FindeksService } from 'src/app/services/findeks.service';
import { RentalService } from 'src/app/services/rental.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  imgPath: string = 'https://localhost:44370';
  dataLoaded = false;
  rentalByCarId:Rental[]=[];
  carDetails: CarDetailDto[] = [];
  carImages: CarImage[] = [];
  filterText: string = '';
  currentCar: Car;
  currentUserId:number;
  currentCarDetail:CarDetailDto;
  dateTimeNow: Date = new Date();
  rentStartDate: Date;
  rentEndDate: Date;
  rentalAvailable: boolean=true;
  userFindeksScore:number;
  carFindeksScore:number;
  isCarAvailable:boolean=false
  constructor(
    private carDetailService: CarDetailService,
    private carImageService: CarImagesService,
    private activatedRoute: ActivatedRoute,
    private rentalService: RentalService,
    private findeksService:FindeksService,
    private userService:UserService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getCarDetailByCarId(params['carId']);
      this.getCarImagesByCarId(params['carId']);
      this.getRentalsByCarId(params['carId']);
    });
    this.getByEmail();
    this.getFindeksScoreById(this.currentUserId);
    this.isCarFindeksAvailable(this.carFindeksScore);
  }
  
  getRentalsByCarId(carId: number) {
    this.rentalService.getRentalsByCarId(carId).subscribe((response) => {
      this.rentalByCarId = response.data;
      this.rentalByCarId.forEach(rental => {
        if ((this.rentalByCarId.length>0)&&(rental.returnDate === null)){
          this.rentalAvailable = false;
        }else{
          this.rentalAvailable=true;
        }
      });
    });
  }
  getCarDetailByCarId(carId: number) {
    this.carDetailService.getCarDetailById(carId).subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });
  }

  getCarDetailByCarIdSingle(carId: number) {
    this.carDetailService.getCarDetailByIdSingle(carId).subscribe((response) => {
      this.currentCarDetail = response.data;
      this.carFindeksScore=this.currentCarDetail.findeksScore;
      this.dataLoaded = true;
    });
  }

  getCarImagesByCarId(carId: number) {
    this.carImageService.getCarImagesByCarId(carId).subscribe((response) => {
      this.carImages = response.data;
      this.dataLoaded = true;
    });
  }

  getFindeksScoreById(userId:number){
    this.findeksService.getById(userId).subscribe(response=>{
      this.userFindeksScore=response?response.data.score:0
    })
  }
  getByEmail(){
    this.userService.getCustomerByEmail().subscribe(response=>{
      this.currentUserId=response.id;
    })
  }

  isCarFindeksAvailable(carFindeks:number){
    let userFindeks=this.userFindeksScore==null?0:this.userFindeksScore
    this.isCarAvailable=userFindeks>carFindeks?true:false
  }

}
