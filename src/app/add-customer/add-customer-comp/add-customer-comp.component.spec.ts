import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustomerCompComponent } from './add-customer-comp.component';

describe('AddCustomerCompComponent', () => {
  let component: AddCustomerCompComponent;
  let fixture: ComponentFixture<AddCustomerCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCustomerCompComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCustomerCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
