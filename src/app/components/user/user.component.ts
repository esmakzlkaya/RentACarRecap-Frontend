import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  userUpdateForm: FormGroup;
  dataLoaded = false;
  currentUser: User;
  currentId:number;
  firstName:string;
  lastName:string;
  email:string;
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['userId']) {
        this.getById(params['userId']);
      }
    });
    this.createUserUpdateForm();
    this.getByEmail();
  }

  getById(id: number) {
    this.userService.getById(id).subscribe((response) => {
      this.currentUser = response;
      this.firstName=this.currentUser.firstName;
      this.lastName=this.currentUser.lastName;
      this.email=this.currentUser.email;
    });
  }

  getByEmail(){
    this.userService.getCustomerByEmail().subscribe(response=> {
      this.currentId=response.id;
    })
  }

  createUserUpdateForm() {
    this.userUpdateForm = this.formBuilder.group({
      id:[''],
      firstName:['',Validators.required],
      lastName: ['', Validators.required],
      email:['',Validators.required],
      password:['',Validators.required]
    });
  }

  update() {
    if (this.userUpdateForm.valid) {
      this.userUpdateForm.value['id'] = this.currentUser.id;
      let userUpdateModel = Object.assign({}, this.userUpdateForm.value);
      this.userService.update(userUpdateModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
        }
      );
    } else {
      this.toastrService.error('Formda eksik alanlar var', 'Dikkat');
    }
  }
}
