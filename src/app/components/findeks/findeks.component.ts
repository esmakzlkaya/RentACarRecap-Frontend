import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FindeksService } from 'src/app/services/findeks.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-findeks',
  templateUrl: './findeks.component.html',
  styleUrls: ['./findeks.component.css']
})
export class FindeksComponent implements OnInit {

  currentUserId:number;
  findeksScore:number;
  nationalityId:string;
  constructor(private findeksService:FindeksService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['userId']) {
        this.getById(params['userId']);
      }
    });
  }

  getById(userId:number){
    this.findeksService.getById(userId).subscribe(response=>{
      this.findeksScore=response?response.data.score:0
      this.nationalityId=response?response.data.nationalityId:''
    })
  }
}
