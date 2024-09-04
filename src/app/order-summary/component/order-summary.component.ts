import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../service/order.service';
import { OrderDTO } from '../models/orderDTO';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css',
})
export class OrderSummaryComponent implements OnInit {
  showDialog: boolean = false;
  obj: any;
  orderSummary: OrderDTO;
  total?: any;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit() {
    const data = this.route.snapshot.queryParams['data'];
    if (data) {
      try {
        this.obj = JSON.parse(data);
        this.obj.userId = 1;
        this.orderSummary = this.obj;
        console.log('My Data', this.obj);
        console.log('My Data', this.orderSummary);

        this.total = this.orderSummary.foodItemsList.reduce(
          (accumulator, currentValue) => {
            return accumulator + currentValue.quantity * currentValue.price;
          },
          0
        );
      } catch (error) {
        console.error('Failed to parse JSON:', error);
      }
    }
  }

  saveOrder() {
    this.orderService.saveOrder(this.orderSummary).subscribe({
      next: (response) => {
        this.showDialog = true;
      },
      error: (error) => {
        console.error('Failed to save data:', error);
      },
      complete: () => {},
    });
  }

  closeDialog() {
    this.showDialog = false;
    this.router.navigate(['/']);
  }
}
