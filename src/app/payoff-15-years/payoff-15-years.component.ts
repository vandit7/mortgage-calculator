import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { SeoService } from '../services/seo.service';


@Component({
  selector: 'app-payoff-15-years',
  templateUrl: './payoff-15-years.component.html',
  styleUrls: ['./payoff-15-years.component.scss'],
  standalone: true,
  imports: [CommonModule, DecimalPipe]
})
export class Payoff15YearsComponent implements OnInit {
  private seoService = inject(SeoService);

  // Example calculation values
  loanAmount = 300000;
  interestRate = 6.5;
  monthlyPayment = 1896.20;
  standardMonths = 360; // 30 years
  acceleratedMonths = 180; // 15 years
  extraMonthlyPayment = 950;
  standardInterestTotal = 382632;
  acceleratedInterestTotal = 141498;
  interestSaved = 241134;

  faqItems = [
    {
      question: 'How much extra do I need to pay monthly to pay off a 30-year mortgage in 15 years?',
      answer: 'For a $300,000 mortgage at 6.5%, you\'d need to pay approximately $950 extra per month on top of your regular $1,896 payment. The exact amount depends on your loan balance, interest rate, and years remaining. Use our early payoff calculator to determine your specific number.'
    },
    {
      question: 'Does paying off my mortgage early hurt my credit score?',
      answer: 'No, paying off your mortgage early actually demonstrates financial responsibility. While closing the account might cause a small temporary dip, your overall credit profile improves significantly as your debt-to-income ratio decreases—a major factor in credit scoring models. Your score typically rebounds within a few months.'
    },
    {
      question: 'Are there prepayment penalties for paying off my mortgage early?',
      answer: 'Most conventional mortgages have no prepayment penalties, allowing you to pay off early without fees. However, some FHA, VA, and USDA loans may have restrictions. Always review your mortgage documents or contact your lender to confirm before making extra payments.'
    }
  ];

  ngOnInit(): void {
    this.seoService.setPageSeo({
      title: 'Mortgage Payoff Strategy: How to Turn a 30-Year into a 15-Year',
      description: 'Learn exactly how to pay off a 30-year mortgage in 15 years. Free calculator, interest savings table ($241K+), and step-by-step strategy for US homeowners.',
      url: '/payoff-15-years',
      keywords: 'pay off 30 year mortgage in 15 years, mortgage payoff strategy, accelerate mortgage payoff, 15 year mortgage payoff plan',
    });

    this.seoService.addFaqSchema(this.faqItems.map(item => ({
      question: item.question,
      answer: item.answer,
    })));
  }

  calculatePayoff(principal: number, rate: number, years: number): any {
    const monthlyRate = rate / 100 / 12;
    const numberOfPayments = years * 12;
    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))
      / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    const totalInterest = (monthlyPayment * numberOfPayments) - principal;

    return {
      monthlyPayment: monthlyPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2)
    };
  }
}
