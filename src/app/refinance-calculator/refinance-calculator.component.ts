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
    this.seoService.addFaqSchema([
      {
        question: 'How much does it cost to refinance?',
        answer: 'Expect to pay between 2% and 5% of your total loan balance in closing costs, which includes appraisal fees, title insurance, and origination fees.'
      },
      {
        question: 'Does refinancing hurt my credit score?',
        answer: 'A refinance involves a hard inquiry, which may cause a temporary dip of a few points. However, consistently making payments on a more affordable loan will help your score in the long run.'
      },
      {
        question: 'Can I refinance with bad credit?',
        answer: 'Yes, though you may not get the best rates. Some government-backed programs like FHA Streamline Refinance have more flexible credit requirements.'
      }
    ]);
  }
}