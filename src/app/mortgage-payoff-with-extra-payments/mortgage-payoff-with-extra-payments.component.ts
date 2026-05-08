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
      title: 'Mortgage Payoff Calculator With Extra Payments — See Your Real Savings',
      description: 'Enter your loan details and extra payment amount to see exactly how many years you cut off and how much interest you save. Free, instant, no signup.',
      url: '/mortgage-payoff-with-extra-payments',
      keywords: 'extra payment mortgage calculator, mortgage payoff with extra payments, additional mortgage payment calculator, pay off mortgage faster',
    });

    this.seoService.addFaqSchema([
      {
        question: 'Will my lender charge a penalty for extra payments?',
        answer: 'In the USA, most conventional mortgages do NOT have prepayment penalties. However, some subprime or older loans might. Always confirm No Prepayment Penalty with your lender before starting.'
      },
      {
        question: 'Should I pay off my mortgage or high-interest credit cards first?',
        answer: 'Generally, you should pay off credit cards first as they often have rates above 20%. Once high-interest debt is gone, apply those savings to your mortgage principal.'
      },
      {
        question: 'What is a Mortgage Recast?',
        answer: 'A recast is when you make a large lump sum payment and the lender recalculates your monthly payment to be lower. This is different from a simple extra payment which keeps the payment the same but ends the loan faster.'
      }
    ]);
  }
}