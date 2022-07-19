import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
const routes: Routes = [
  {path:'',redirectTo:'products',pathMatch:'full'},
  {path:'productDetails/:id',component:ProductDetailsComponent},
  {path:'products',component:ProductListComponent,title:'Products Page'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
