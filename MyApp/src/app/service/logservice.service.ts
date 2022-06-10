import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class LogserviceService extends ApiService{
  public url: string = this.getBaseUrl();
  public token = '';
 
  login(param:any):Observable<any> {
    const header = this.headerBase();
    console.log("this header:: ==============> ",header.headers);
    return this.http.post(this.url + 'login', param,{headers:header});
    // this.http.get(this.url+'',{headers:header})
  }

}
