import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'model/user.model';
import Swal from 'sweetalert2';
// import  Swal from 'sweetalert2/dist/sweetalert2.js';
import { LogserviceService } from '../service/logservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: UserModel = new UserModel()
  constructor(
    private s: LogserviceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    
  }

  login() {
    console.log("this===> ", this.user);
    this.s.login(this.user).subscribe(r => {
      console.log(r);
      if (r['status'] == 1) {
        localStorage.setItem('token', r['data'].token)
        this.router.navigate(['/userlist']);
      }
    })

  }
}
