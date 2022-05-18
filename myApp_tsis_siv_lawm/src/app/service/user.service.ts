import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiService {
  url = this.getBaseUrl();

  userlist(): Observable<any> {
    return this.http.get(this.url + 'userlist', { headers: this.headerBase() });
  }

  addUser(data: any): Observable<any> {
    return this.http.put(this.url + 'admin/createUser', data, { headers: this.AdminheaderBase() })
  }

  // update(data: any): Observable<any> {
  //   return this.http.patch(this.url + '', data)
  // }

  delelet(id: any): Observable<any> {
    return this.http.delete(this.url + 'delete?id=' + id)
  }

  edit(id: string, data: any): Observable<any> {
    return this.http.patch(this.url + 'UpdateUser?id=' + id, data);
  }
}
