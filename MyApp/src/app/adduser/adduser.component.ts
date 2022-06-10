import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserModel } from 'model/user.model';
import { DataserviceService } from '../service/dataservice.service';
import { UserService } from '../service/user.service';
import { UserListComponent } from '../user-list/user-list.component';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  @Input() user: UserModel = new UserModel

  constructor(
    private userservice: UserService,
    private userlist: UserListComponent,
    public dataservic: DataserviceService
  ) { }

  ngOnInit(): void {

  }


  save() {
    this.userservice.addUser(this.user).subscribe(r => {
      console.log("save ok....", r);

      this.userlist.getUser();
      // this.user = {};
    })
    console.log("hello save button is worked...!", this.user)
  }
  edit() {
    this.userservice.edit(this.user.id + '', this.user).subscribe(r => {
      console.log("edit Ok....", r);
      // this.user = {}
  
    })
  }


}
