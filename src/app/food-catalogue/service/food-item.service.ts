import { Injectable } from '@angular/core';
import { from, Observable, throwError } from 'rxjs';
import { API_URL_FC } from '../../constants/url';

@Injectable({
  providedIn: 'root',
})
export class FoodItemService {
  private apiUrl = API_URL_FC + '/foodCatalogue/foodCataloguePage/';

  constructor() {}

  getFoodItemsByRestaurant(id: Number): Observable<any> {
    const fetchPromise = fetch(`${this.apiUrl}${id}`, {
      method: 'GET',
      headers: {
        'content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .catch(this.handleError);

    return from(fetchPromise);
  }
  private handleError(error: any) {
    console.error('An error occured:', error);
    return throwError(() => new Error(error.message || 'Server Error'));
  }
}
