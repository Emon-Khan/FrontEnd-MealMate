import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantListingRoutingModule } from './restaurant-listing-routing.module';
import { RestaurantListingComponent } from './components/restaurant-listing.component';
import { HeaderModule } from '../header/header.module';

@NgModule({
  declarations: [RestaurantListingComponent],
  imports: [CommonModule, RestaurantListingRoutingModule, HeaderModule],
})
export class RestaurantListingModule {}
