import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MortgagePayoffWithExtraPaymentsComponent } from './mortgage-payoff-with-extra-payments.component';

describe('MortgagePayoffWithExtraPaymentsComponent', () => {
  let component: MortgagePayoffWithExtraPaymentsComponent;
  let fixture: ComponentFixture<MortgagePayoffWithExtraPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MortgagePayoffWithExtraPaymentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MortgagePayoffWithExtraPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});