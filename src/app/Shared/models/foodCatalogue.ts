import { FoodItems } from './foodItems';
import { Restaurant } from './restaurant';

export interface FoodCatalogue {
  foodItemsList: FoodItems[];
  restaurant: Restaurant;
}
