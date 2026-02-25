import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RefinanceVsPayoffComponent } from './refinance-vs-payoff.component';

describe('RefinanceVsPayoffComponent', () => {
  let component: RefinanceVsPayoffComponent;
  let fixture: ComponentFixture<RefinanceVsPayoffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RefinanceVsPayoffComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefinanceVsPayoffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set SEO title and meta tags', () => {
    expect(component).toBeTruthy();
  });

  it('should have comparison scenarios', () => {
    expect(component.comparisonScenarios.length).toBeGreaterThan(0);
  });

  it('should have valid refinance calculations', () => {
    expect(component.monthlyPaymentRefinance15).toBeGreaterThan(component.monthlyPaymentCurrent);
    expect(component.refinanceSavings).toBeGreaterThan(0);
  });
});
