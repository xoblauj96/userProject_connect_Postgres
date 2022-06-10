import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CropImageComponent } from './crop-image/crop-image.component';
import { LoginComponent } from './login/login.component';
import { ProductlstComponent } from './productlst/productlst.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'userlist', component: UserListComponent },
  { path: 'productlist', component: ProductlstComponent },
  { path: 'cropimage', component: CropImageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
