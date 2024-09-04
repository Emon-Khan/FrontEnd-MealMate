import { Injectable } from '@angular/core';
import { from, Observable, throwError } from 'rxjs';
import { API_URL_ORDER } from '../../constants/url';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = API_URL_ORDER + '/order/orders';
  constructor() {}
  saveOrder(data: any): Observable<any> {
    console.log('Data sent to backend:', data);

    const fetchPromise = fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200',
      },
      body: JSON.stringify(data),
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
