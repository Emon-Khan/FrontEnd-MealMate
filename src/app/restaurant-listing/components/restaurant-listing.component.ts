import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../../Shared/models/restaurant';
import { Router } from '@angular/router';
import { RestaurantService } from '../service/restaurant.service';

@Component({
  selector: 'app-restaurant-listing',
  templateUrl: './restaurant-listing.component.html',
  styleUrl: './restaurant-listing.component.css',
})
export class RestaurantListingComponent implements OnInit {
  public restaurantList: Restaurant[];
  randomIndex = 0;

  ngOnInit() {
    this.getAllRestaurants();
  }
  constructor(
    private router: Router,
    private restaurantService: RestaurantService
  ) {}
  getAllRestaurants() {
    return this.restaurantService.getAllRestaurants().subscribe((data) => {
      this.restaurantList = data;
    });
  }
  getRandomNumber(): number {
    this.randomIndex += 1;
    const imageCount = 8;
    return (this.randomIndex % imageCount) + 1;
  }
  getRandomImage(): string {
    return `${this.getRandomNumber()}.jpg`;
  }

  onButtonClick(id: number | undefined) {
    this.router.navigate(['/food-catalogue', id]);
  }
}
