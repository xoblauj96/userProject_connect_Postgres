import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http: HttpClient) { }

  protected getBaseUrl(): string {
    return "http://localhost:8888/";
  }

  protected headerBase(): any {

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' }).set('authorization', token + '');
    return headers;

  }

  protected AdminheaderBase(): any {

    const token = '9F58A83B7628211D6E739976A3E3A';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' }).set('super-admin-authorization', token + '');
    return headers;

  }
}
