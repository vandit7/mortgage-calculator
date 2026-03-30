import { Component, OnInit, inject } from '@angular/core';
import { EarlyMortgagePayoffCalculatorComponent } from '../early-mortgage-payoff-calculator/early-mortgage-payoff-calculator.component';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-mortgage-calculator',
  standalone: true,
  imports: [EarlyMortgagePayoffCalculatorComponent],
  templateUrl: './mortgage-calculator.component.html',
  styleUrl: './mortgage-calculator.component.scss',
})
export class MortgageCalculatorComponent implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.setPageSeo({
      title: 'Mortgage Payment Calculator — Estimate Your Monthly Payment (2026)',
      description: 'Free mortgage calculator to estimate monthly payments including principal, interest, taxes, insurance & PMI. Accurate calculations for any US mortgage.',
      url: '/mortgage-calculator',
      keywords: 'mortgage calculator, monthly mortgage payment calculator, mortgage payment estimator, home loan calculator, PITI calculator',
    });
  }
}