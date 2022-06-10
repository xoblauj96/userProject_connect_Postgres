import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserModel } from 'model/user.model';
import { DataserviceService } from '../service/dataservice.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(
    private userservice: UserService,
    public dataservic: DataserviceService
  ) { }

  userArray?: UserModel[];
  user: UserModel = new UserModel

  ngOnInit(): void {
    this.getUser();
  }

  currentItem = {};
  edit(user: UserModel) {
    this.currentItem = user;
  }


  getUser() {
    this.userservice.userlist().subscribe(r => {
      this.userArray = r.data;
      console.log("this.userArray===> ", this.userArray);
    });
  }


  delete(id: any) {
    console.log("this id===> ", id);

    this.userservice.delelet(id).subscribe(r => {
      console.log("delete ....", r);
      this.getUser();
    })
  }


}
