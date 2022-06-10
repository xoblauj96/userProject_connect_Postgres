import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'model/product.model';
import { environment } from 'src/environments/environment';
import { PaginationService } from '../service/paginate.service';
import { ProdcutService } from '../service/prodcut.service';

@Component({
  selector: 'app-productlst',
  templateUrl: './productlst.component.html',
  styleUrls: ['./productlst.component.scss']
})
export class ProductlstComponent implements OnInit {

  productArray?: ProductModel[];
  product: ProductModel = new ProductModel


  lists: any;
  btns: any;


  public imgURL = environment.serverUrl

  constructor(
    private productService: ProdcutService, private paginSevices: PaginationService) { }

  ngOnInit(): void {
    // console.log(this.imgURLss);

    this.productList(1);
  }
  skip: any = 0
  limit: any = 5
  productList(page: number) {
    this.skip = page;
    this.limit = 5;

    this.productService.productList(this.skip, this.limit).subscribe((r) => {
      console.log(r);
      if (r.status == 1) {
        this.productArray = r.data;
        console.log(this.productArray.length);
        
        this.btns = this.paginSevices.paginate(page, Math.floor(parseFloat(r.message.toString()) / 5));
        console.log(this.btns);
        console.log(page);
        
      }


    })
  }



  showPagin() {

  }
}
