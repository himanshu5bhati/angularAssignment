import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PinAssignment';
  pinList = JSON.parse(localStorage.getItem('pin') as string)
  customerList = JSON.parse(localStorage.getItem('customers') as string)

  handleModalClosed() {
    // Handle customer modal closed event
    this.pinList = JSON.parse(localStorage.getItem('pin') as string)
    this.customerList = JSON.parse(localStorage.getItem('customers') as string)
  }

  handlePinModalClosed() {
    // Handle pin modal closed event
    this.pinList = JSON.parse(localStorage.getItem('pin') as string)
    this.customerList = JSON.parse(localStorage.getItem('customers') as string)
  }
}
