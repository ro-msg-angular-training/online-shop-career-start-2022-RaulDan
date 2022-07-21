import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { AddProductFormComponent } from './add-product-form/add-product-form.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

const routes: Routes = [
  {
    path: '', canActivate: [AuthGuard],
    children:
      [
        { path: 'productDetails/:id', component: ProductDetailsComponent },
        { path: 'products', component: ProductListComponent, title: 'Products Page' },
        { path: 'addProduct', component: AddProductFormComponent, title: 'Add New Product' },
        { path: 'shoppingCartPage', component: ShoppingCartComponent, title: 'Shopping Cart' }
      ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: '**', component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
