import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myApp';

  token: any;
  setTen() {
    this.token = "this is token now";
    localStorage.setItem('token', this.token)
    sessionStorage.setItem('session', this.token);
  }
  alert() {
    alert(sessionStorage.getItem('session'))
  }
  Remove() {
    localStorage.removeItem("token")
    sessionStorage.removeItem('session')
  }

}