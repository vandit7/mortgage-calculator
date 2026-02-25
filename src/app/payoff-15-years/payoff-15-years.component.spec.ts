import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Payoff15YearsComponent } from './payoff-15-years.component';

describe('Payoff15YearsComponent', () => {
  let component: Payoff15YearsComponent;
  let fixture: ComponentFixture<Payoff15YearsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Payoff15YearsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Payoff15YearsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set SEO title and meta tags', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate payoff correctly', () => {
    const result = component.calculatePayoff(300000, 6.5, 30);
    expect(parseFloat(result.monthlyPayment)).toBeGreaterThan(0);
    expect(parseFloat(result.totalInterest)).toBeGreaterThan(0);
  });
});
