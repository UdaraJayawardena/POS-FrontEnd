import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CustomerService} from '../../service/customer.service';
import {Customer} from '../../dto/customer';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-customercontent',
  templateUrl: './customercontent.component.html',
  styleUrls: ['./customercontent.component.css']
})
export class CustomercontentComponent implements OnInit {
  customers: Customer[] = [];
  SCustomers: Customer[] = [];
  selectedCustomer: Customer = new Customer('', '', '', 0);
  cusid = '';
  cusname = '';
  cusaddress = '';
  cussalary = '';
  cusplaceID = '';

  @ViewChild('txtId') txtId: ElementRef;
  @ViewChild('frmCustomer') frmCustomer: NgForm;
  constructor(private customerService: CustomerService) {
  }

  ngOnInit() {
    this.customerService.getAllCustomers().subscribe(customers => {
      console.log('get All Customers');
      this.customers = customers;

      const customer = this.customers.find(value => value.id === value.id);
      console.log(customer);

    });
  }

  saveCustomer(): void {
    console.log('Save Click');
    if (!this.frmCustomer.invalid) {
      this.customerService.saveCustomer(this.selectedCustomer)
        .subscribe(resp => {
          if (resp) {
            alert('Customer has been saved successfully');
            this.customers.push(this.selectedCustomer);
            this.customerService.getAllCustomers();
          } else {
            alert('Failed to save the customer');
          }
        });

    } else {
      alert('Invalid Data, Please Correct...!');
    }
  }

  updateCustomer(id, name, address, salary): void {
    console.log('Update Click');
    const cusUpdate = new Customer(id, name, address, salary);
    console.log(cusUpdate);
    this.customerService.updateCustomer(cusUpdate).subscribe(
      (result) => {
        alert('Update successfull..');
        this.customerService.getAllCustomers();
      }
    );
  }

  deleteCustomer(id): void {
    console.log('Delete Click..');
    const customerIdValDel = id;
    this.customerService.deleteCustomer(customerIdValDel).subscribe(
      (result) => {
        alert('Customer Deleted Successfully...');
        this.customerService.getAllCustomers();
      }
    );
  }


  searchCustomer(id): void {
    console.log('search Customer in component');
    const CUSVals = this.customers.find((value => value.id === 'C005'));
    this.cusid = id;
    this.cusname = CUSVals.name;
    this.cusaddress = CUSVals.address;
    this.cussalary = String(CUSVals.salary);
  }

}
