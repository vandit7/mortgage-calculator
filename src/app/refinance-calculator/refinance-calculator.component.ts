import { Component, OnInit, inject } from '@angular/core';
import { EarlyMortgagePayoffCalculatorComponent } from '../early-mortgage-payoff-calculator/early-mortgage-payoff-calculator.component';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-refinance-calculator',
  standalone: true,
  imports: [EarlyMortgagePayoffCalculatorComponent],
  templateUrl: './refinance-calculator.component.html',
  styleUrl: './refinance-calculator.component.scss',
})
export class RefinanceCalculatorComponent implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.setPageSeo({
      title: 'Mortgage Refinance Calculator — Should You Refinance? Free (2026)',
      description: 'Should you refinance? Compare your current rate vs new rates to see monthly savings and break-even point. Free instant calculator, no signup required.',
      url: '/refinance-calculator',
      keywords: 'mortgage refinance calculator, refinance calculator, should I refinance, refinance break even, mortgage refinance savings',
    });
  }
}