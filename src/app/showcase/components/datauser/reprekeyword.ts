import { Component, OnInit } from '@angular/core';
import { Customer } from '../../domain/customer';
import { CustomerService } from '../../service/customerservice';

@Component({
    templateUrl: './reprekeyword.html',
    styleUrls: ['./datauser.scss']
})
export class Reprekeyword implements OnInit {

    customers1: Customer[];

    customers2: Customer[];

    selectedCustomer1: Customer;

    selectedCustomer2: Customer;

    constructor(private customerService: CustomerService) { }

    ngOnInit() {
        this.customerService.getCustomersMedium().then(data => this.customers1 = data);
        this.customerService.getCustomersMedium().then(data => this.customers2 = data);
    }
    
}