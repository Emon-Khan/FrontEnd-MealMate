import { FoodItems } from '../../Shared/models/foodItems';
import { Restaurant } from '../../Shared/models/restaurant';

export interface OrderDTO {
  foodItemsList: FoodItems[];
  userId: number;
  restaurant: Restaurant;
}
