import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPinCompComponent } from './add-pin-comp.component';

describe('AddPinCompComponent', () => {
  let component: AddPinCompComponent;
  let fixture: ComponentFixture<AddPinCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPinCompComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPinCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
