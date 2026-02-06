import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefinanceCalculatorComponent } from './refinance-calculator.component';

describe('RefinanceCalculatorComponent', () => {
  let component: RefinanceCalculatorComponent;
  let fixture: ComponentFixture<RefinanceCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RefinanceCalculatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefinanceCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});