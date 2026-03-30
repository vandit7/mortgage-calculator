import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-refinance-vs-payoff',
  templateUrl: './refinance-vs-payoff.component.html',
  styleUrls: ['./refinance-vs-payoff.component.scss'],
  standalone: true,
  imports: [CommonModule, DecimalPipe]
})
export class RefinanceVsPayoffComponent implements OnInit {
  private seoService = inject(SeoService);

  // Example scenario
  currentRate = 6.5;
  refinanceRate = 5.5;
  loanAmount = 300000;
  yearsRemaining = 27;
  monthlyPaymentCurrent = 1896.20;
  monthlyPaymentRefinance15 = 2397.60;
  extraPaymentStrategy = 950;
  refinanceSavings = 241134;
  extraPaymentSavings = 215000;
  closingCosts = 3000;
  breakEven = 12;

  comparisonScenarios = [
    {
      scenario: 'Scenario 1: Rates Drop Significantly (2% drop)',
      description: 'Current rate: 6.5% → Refinance to: 4.5%',
      recommendation: 'Refinance is likely better. Monthly payment reduces and you still reach 15-30 year payoff faster.',
      monthly: '$1,520',
      savings: '$400K+'
    },
    {
      scenario: 'Scenario 2: Modest Rate Drop (0.5% drop)',
      description: 'Current rate: 6.5% → Refinance to: 6.0%',
      recommendation: 'Compare break-even point. Extra payments may be more cost-effective.',
      monthly: '$1,799',
      savings: '$180K'
    },
    {
      scenario: 'Scenario 3: Rates Same or Higher',
      description: 'Current rate: 6.5% → Rates now: 7.0%+',
      recommendation: 'Extra payments are better. Refinancing costs outweigh savings.',
      monthly: '$2,000+',
      savings: 'Negative'
    }
  ];

  faqItems = [
    {
      question: 'Is refinancing worth it in 2025?',
      answer: 'Refinancing is worth it only if rates have dropped significantly (typically 0.75-1% below your current rate) and you plan to stay in the home long enough to recoup closing costs. Compare your break-even point (months to recover closing costs) against expected time in home. In 2025, always calculate the specific math for your situation. Market conditions change frequently.'
    },
    {
      question: 'Does refinancing reset my loan term?',
      answer: 'Yes, refinancing typically resets your loan to a new 15, 20, or 30-year term depending on which option you choose. However, you can refinance from a 30-year to a 20-year (or 15-year) to accelerate payoff without resetting completely. Always specify your desired term when refinancing.'
    },
    {
      question: 'Should I invest instead of paying off my mortgage?',
      answer: 'This is a personal financial decision depending on three factors: (1) Your mortgage rate (guaranteed return from payoff), (2) Expected investment returns, and (3) Your risk tolerance. A 6.5% guaranteed return from mortgage payoff is conservative but stable, while stock market historically returns 10% but with volatility. Many successful people do both—pay some extra mortgage principal while investing the remainder.'
    }
  ];

  ngOnInit(): void {
    this.seoService.setPageSeo({
      title: 'Refinance vs Early Payoff — Which Strategy Saves You More? (2026)',
      description: 'Compare refinancing vs paying extra on your mortgage. Analyze real scenarios, calculate break-even points, and find the optimal strategy for your situation.',
      url: '/refinance-vs-payoff',
      keywords: 'refinance vs early payoff, should I refinance or pay extra, mortgage refinance comparison, pay off mortgage vs refinance',
    });

    this.seoService.addFaqSchema(this.faqItems.map(item => ({
      question: item.question,
      answer: item.answer,
    })));
  }
}
