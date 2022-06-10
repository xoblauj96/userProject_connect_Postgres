import { Injectable } from '@angular/core';
import { ProductModel } from 'model/product.model';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProdcutService extends ApiService{
  url = this.getBaseUrl()+"product/";

  urlType = this.getBaseUrl()+"product_type/"


  productList(skip,limit): Observable<any> {
    
    return this.http.post(this.url + 'listjoin2?skip='+skip+'&limit='+limit, { headers: this.headerBase() });
  }


  productSave(data: ProductModel): Observable<any> {
    
    return this.http.post(this.url + 'save',data, { headers: this.headerBase() });
  }
  

  protyList(): Observable<any> {
    return this.http.post(this.urlType + 'list', { headers: this.headerBase() });

  }

}
