import { Injectable } from '@angular/core';
import { from, Observable, throwError } from 'rxjs';
import { API_URL_RL } from '../../constants/url';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  private apiUrl = API_URL_RL + '/restaurant/restaurants';

  constructor() {}

  getAllRestaurants(): Observable<any> {
    const fetchPromise = fetch(this.apiUrl, {
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

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error(error.message || 'Server Error'));
  }
}
