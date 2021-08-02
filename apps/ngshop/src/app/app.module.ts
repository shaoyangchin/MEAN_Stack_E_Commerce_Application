import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductListComponent } from './pages/product-list/product-list.component';

@NgModule({
  declarations: [AppComponent, HomePageComponent, ProductListComponent],
  imports: [BrowserModule, RouterModule.forRoot([{
    path: "",
    component: HomePageComponent,
  },
{
  path: "products", component: ProductListComponent
}])],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
