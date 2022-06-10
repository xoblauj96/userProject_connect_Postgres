import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'model/product.model';
import { ProductlstComponent } from '../productlst/productlst.component';
import { ProdcutService } from '../service/prodcut.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss']
})
export class AddproductComponent implements OnInit {

  constructor(private productService: ProdcutService,private productList: ProductlstComponent) { }

  protyArray:[]

  product: ProductModel = new ProductModel
  showImage: string;

  ngOnInit(): void {
    
    this.productTypeList();
  }

  productTypeList(){
    this.productService.protyList().subscribe(r=>{
      if(r.status ==1)
      this.protyArray=r.data;

      console.log(this.protyArray);
      

    })
  }



  changes(r){
    console.log(r);
    
  }





  selectImage(f){
   const file= (f.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = (r) => {
      console.log(r.target.result);
      
      this.showImage = reader.result as string;
      this.product.image = this.showImage;
    }
    reader.readAsDataURL(file)
    
  } 


  save(){
    this.product.UserXYZId = localStorage.getItem('userId');
    console.log(this.product);
    // console.log(JSON.stringify(this.product));
    this.productService.productSave(this.product).subscribe(r=>{
      console.log(r);
      
      if(r.status==1){
        console.log('======> ',r);
        this.productList.productList(0);
      }
    })
  }

}
