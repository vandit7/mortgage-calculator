import { Component, OnInit, inject } from '@angular/core';
import { EarlyMortgagePayoffCalculatorComponent } from '../early-mortgage-payoff-calculator/early-mortgage-payoff-calculator.component';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-mortgage-payoff-with-extra-payments',
  standalone: true,
  imports: [EarlyMortgagePayoffCalculatorComponent],
  templateUrl: './mortgage-payoff-with-extra-payments.component.html',
  styleUrl: './mortgage-payoff-with-extra-payments.component.scss',
})
export class MortgagePayoffWithExtraPaymentsComponent implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.setPageSeo({
      title: 'Extra Payment Mortgage Calculator [2026] — Save $200K+ Today',
      description: 'See how extra monthly or one-time payments save you $100K-$250K in mortgage interest. Free calculator: Model any payment scenario instantly. [Trusted Tool]',
      url: '/mortgage-payoff-with-extra-payments',
      keywords: 'extra payment mortgage calculator, mortgage payoff with extra payments, additional mortgage payment calculator, pay off mortgage faster',
    });

    this.seoService.addFaqSchema([
      {
        question: 'Is there a penalty for paying off a mortgage early in the USA?',
        answer: 'In most cases, there is no penalty for paying off your mortgage early in the USA. However, some older loans or specific loan types may have prepayment penalties. Always check your loan documents or contact your lender to confirm.'
      },
      {
        question: 'Does extra payment go to principal?',
        answer: 'Yes, extra payments are typically applied directly to the principal balance of your loan, reducing the amount that accrues interest. This helps you build equity faster and shorten your loan term.'
      },
      {
        question: 'Is it better to pay off a mortgage early or invest?',
        answer: 'This depends on your individual circumstances. If your mortgage rate is higher than potential investment returns and you have an emergency fund, paying extra on your mortgage can be beneficial. However, if you can earn higher returns through investments, that might be preferable.'
      }
    ]);
  }
}