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
      title: 'Extra Payment Mortgage Calculator — Pay Off Your Home Faster (2026)',
      description: 'See how extra monthly or one-time payments save you $50K-$200K in mortgage interest and cut years off your loan. Free calculator with instant results.',
      url: '/mortgage-payoff-with-extra-payments',
      keywords: 'extra payment mortgage calculator, mortgage payoff with extra payments, additional mortgage payment calculator, pay off mortgage faster',
    });
  }
}