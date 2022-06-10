import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {HttpClientModule} from '@angular/common/http';
import { UserListComponent } from './user-list/user-list.component';
import { HeaderComponent } from './header/header.component';
import { AdduserComponent } from './adduser/adduser.component';
import { ProductlstComponent } from './productlst/productlst.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { CropImageComponent } from './crop-image/crop-image.component';
// import { ImageCropperModule } from 'ngx-image-zoom-cropper';
// import { ImageCropperModule } from 'ngx-image-cropper';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserListComponent,
    HeaderComponent,
    AdduserComponent,
    ProductlstComponent,
    AddproductComponent,
    CropImageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    // ImageCropperModule,
    // NgxPhotoEditorModule,
    // NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
