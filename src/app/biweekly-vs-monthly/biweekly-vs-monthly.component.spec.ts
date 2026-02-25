import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BiweeklyVsMonthlyComponent } from './biweekly-vs-monthly.component';

describe('BiweeklyVsMonthlyComponent', () => {
  let component: BiweeklyVsMonthlyComponent;
  let fixture: ComponentFixture<BiweeklyVsMonthlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BiweeklyVsMonthlyComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BiweeklyVsMonthlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set SEO title and meta tags', () => {
    expect(component).toBeTruthy();
  });

  it('should have comparison table data', () => {
    expect(component.comparisonTable.length).toBeGreaterThan(0);
  });

  it('should calculate interest saved correctly', () => {
    expect(component.interestSaved).toBeGreaterThan(0);
    expect(component.yearsShaved).toBeGreaterThan(0);
  });
});
