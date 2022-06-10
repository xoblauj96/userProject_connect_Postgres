import { Injectable } from '@angular/core';
import { UserModel } from 'model/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {


  public userDataService: UserModel = new UserModel;
  
  constructor() { }

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  

  changeMessage(message: string) {
    this.messageSource.next(message)
  }
}
