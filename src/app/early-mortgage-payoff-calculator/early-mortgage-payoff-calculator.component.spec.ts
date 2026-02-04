import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarlyMortgagePayoffCalculatorComponent } from './early-mortgage-payoff-calculator.component';

describe('EarlyMortgagePayoffCalculatorComponent', () => {
  let component: EarlyMortgagePayoffCalculatorComponent;
  let fixture: ComponentFixture<EarlyMortgagePayoffCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EarlyMortgagePayoffCalculatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EarlyMortgagePayoffCalculatorComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
