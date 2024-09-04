import { Component, OnInit } from '@angular/core';
import { FoodItemService } from '../service/food-item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodCatalogue } from '../../Shared/models/foodCatalogue';
import { FoodItems } from '../../Shared/models/foodItems';

@Component({
  selector: 'app-food-catalogue',
  templateUrl: './food-catalogue.component.html',
  styleUrl: './food-catalogue.component.css',
})
export class FoodCatalogueComponent implements OnInit {
  restaurantId: number;
  foodItemResponse: FoodCatalogue;
  foodItemCart: FoodItems[] = [];
  orderSummary: FoodCatalogue;

  constructor(
    private route: ActivatedRoute,
    private foodItemService: FoodItemService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.restaurantId = +idParam;
        console.log(this.restaurantId);
        this.getFoodItemsByRestaurant(this.restaurantId);
      } else {
        console.error("No 'id' parameter found in the route.");
      }
    });
  }

  getFoodItemsByRestaurant(restaurantId: number) {
    this.foodItemService
      .getFoodItemsByRestaurant(restaurantId)
      .subscribe((data) => {
        this.foodItemResponse = data;
      });
  }

  increment(food: FoodItems) {
    food.quantity++;
    const index = this.foodItemCart.findIndex((item) => item.id === food.id);
    if (index === -1) {
      console.log('Yes');
      this.foodItemCart.push(food);
    } else {
      this.foodItemCart[index] = food;
    }
  }

  decrement(food: FoodItems) {
    if (food.quantity > 0) {
      food.quantity--;

      const index = this.foodItemCart.findIndex((item) => item.id === food.id);

      if (this.foodItemCart[index].quantity == 0) {
        this.foodItemCart.splice(index, 1);
      } else {
        this.foodItemCart[index] = food;
      }
    }
  }

  onCheckOut() {
    this.orderSummary = {
      foodItemsList: this.foodItemCart,
      restaurant: this.foodItemResponse.restaurant,
    };
    this.orderSummary.foodItemsList = this.foodItemCart;
    this.orderSummary.restaurant = this.foodItemResponse.restaurant;
    console.log('Order Summary ', this.orderSummary);
    this.router.navigate(['/orderSummary'], {
      queryParams: { data: JSON.stringify(this.orderSummary) },
    });
  }
}
