import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {
  userName: string;
  userId: number;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.getByEmail();
  }

  isAuthenticated() {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      return false;
    }
  }

  logOut() {
    this.authService.logout();
  }

  getByEmail() {
    this.userService.getCustomerByEmail().subscribe((response) => {
      let firstName = response.firstName;
      let lastName = response.lastName;
      this.userName = firstName + ' ' + lastName;
      this.userId = response.id;
    });
  }
}
