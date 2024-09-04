import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import path from 'path';
import { FoodCatalogue } from '../Shared/models/foodCatalogue';
import { FoodCatalogueComponent } from './component/food-catalogue.component';

const routes: Routes = [
  { path: 'food-catalogue/:id', component: FoodCatalogueComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoodCatalogueRoutingModule {}
