import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { RegionService } from '../../../app/services/region.service'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {
  title: any;
  email: any;
  region: any;
  country: any;
  regionArr: any = [];
  countriesArr: any = [];
  apiData: any = []
  customersList: any = JSON.parse(localStorage.getItem('customers') as string) || []
  err: boolean = false;
  errMessage: string = '';
  @ViewChild('close')
  closebtnRef!: ElementRef;
  @Output() closed: EventEmitter<any> = new EventEmitter();


  constructor(private regionApi: RegionService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.regionList()
  }

  closeModel() {
    this.title = ''
    this.email = ''
    this.regionList()
    this.closed.emit();
  }

  regionList() {
    // operations to get region and country data based on keys
    this.regionApi.getRegion().subscribe({
      next: (data: any) => {
        this.apiData = data.data
        const regions = [...new Set(Object.values(data.data).map((country: any) => country.region))];
        this.regionArr = regions;
        this.region = this.regionArr[0];
        this.regionChanged(this.region)
      },
      error: (err: any) => { }

    })
  }

  regionChanged(region: any) {
    // Handle region change to update country list
    const countriesByRegion: any = {};
    this.countriesArr = countriesByRegion[region] = Object.values(this.apiData)
      .filter((country: any) => country.region === region)
      .map((country: any) => country.country);
    this.country = this.countriesArr[0];
  }

  onSubmit() {
    // validations on submit
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (this.title == '' || this.title == undefined || this.title == null) {
      this.err = true
      this.errMessage = 'Title is required'
    } else if (this.email == '' || this.email == undefined || this.email == null || !emailPattern.test(this.email)) {
      this.err = true
      this.errMessage = 'Please provide valid email.'
    } else {
      this.err = false
      this.errMessage = ''
      let customer = {
        title: this.title,
        email: this.email,
        region: this.region,
        country: this.country
      }
      let exists = this.customersList != null ? this.customersList.some((obj: any) => obj.email === customer.email) : false // Duplicate customer check
      // push object in localstorage
      if (!exists) {
        this.customersList.push(customer);
        localStorage.setItem('customers', JSON.stringify(this.customersList))
        this.toastr.success('Customer added successfully');
        this.closebtnRef.nativeElement.click(); //Trigger modal close
      } else {
        this.err = true
        this.errMessage = 'Customer already exists'
      }
    }
  }

}
