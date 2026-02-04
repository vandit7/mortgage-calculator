import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-early-mortgage-payoff-calculator',
  imports: [FormsModule, CommonModule],
  templateUrl: './early-mortgage-payoff-calculator.component.html',
  styleUrl: './early-mortgage-payoff-calculator.component.scss',
})
export class EarlyMortgagePayoffCalculatorComponent implements OnInit {
 constructor(private title: Title,
    private meta: Meta) {
    this.title.setTitle('Early Mortgage Payoff Calculator – Save Interest');
    this.meta.updateTag({
      name: 'description',
      content: 'Calculate how much interest you can save by paying off your mortgage early.'
    });
  }

  ngOnChanges() {
    if (this.downPayment > this.homePrice) {
      this.downPayment = this.homePrice;
    }
  }

  ngOnInit(): void {
    this.title.setTitle(
      'US Mortgage Calculator – Monthly Payment, PMI, Tax & Insurance'
    );

    this.meta.addTags([
      {
        name: 'description',
        content:
          'Free US mortgage calculator. Estimate monthly mortgage payments including PMI, property tax, and insurance. Accurate & easy to use.'
      },
      {
        name: 'keywords',
        content:
          'mortgage calculator, US mortgage calculator, home loan calculator, mortgage payment calculator, PMI calculator'
      },
      { name: 'robots', content: 'index, follow' },

      // Open Graph (for sharing)
      { property: 'og:title', content: 'US Mortgage Calculator' },
      {
        property: 'og:description',
        content:
          'Calculate your US mortgage payment including PMI, taxes & insurance.'
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://yourdomain.com/mortgage-calculator' }
    ]);
  }
  homePrice = 400000;
  downPayment = 80000;
  interestRate = 6.5;
  loanTerm = 30;

  propertyTaxRate = 1.2; // %
  insurancePerYear = 1200;
  pmiRate = 0.5; // %

  monthlyPayment = 0;
  totalMonthlyCost = 0;
  totalInterest = 0; // NEW: total interest over the selected loan term

  calculateMortgage() {
    const loanAmount = this.homePrice - this.downPayment;
    const monthlyRate = this.interestRate / 100 / 12;
    const totalMonths = this.loanTerm * 12;

    // Base mortgage (handle zero-rate case)
    let basePayment: number;
    if (monthlyRate === 0) {
      basePayment = loanAmount / totalMonths;
    } else {
      basePayment =
        loanAmount *
        (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1);
    }

    // PMI (only if down payment < 20%)
    const downPercent = (this.downPayment / this.homePrice) * 100;
    const monthlyPMI =
      downPercent < 20
        ? (loanAmount * (this.pmiRate / 100)) / 12
        : 0;

    // Property tax
    const monthlyPropertyTax =
      (this.homePrice * (this.propertyTaxRate / 100)) / 12;

    // Insurance
    const monthlyInsurance = this.insurancePerYear / 12;

    // total interest paid over the loan term (mortgage only)
    const totalPaidOnMortgage = basePayment * totalMonths;
    const interestTotal = totalPaidOnMortgage - loanAmount;

    this.monthlyPayment = basePayment;
    this.totalMonthlyCost =
      basePayment + monthlyPMI + monthlyPropertyTax + monthlyInsurance;

    this.totalInterest = Math.max(0, Math.round(interestTotal * 100) / 100);
  }

  getRangeBackground(value: number, min: number, max: number): string {
    // prevent divide-by-zero
    const safeMin = (min === undefined || min === null) ? 0 : min;
    const safeMax = (max === undefined || max === null || max === safeMin) ? safeMin + 1 : max;
    const v = (value === undefined || value === null) ? safeMin : value;
    const pct = Math.max(0, Math.min(100, Math.round(((v - safeMin) / (safeMax - safeMin)) * 100)));
    // left = filled color, right = track color
    return `linear-gradient(90deg, #2b90ff ${pct}%, #e6eef8 ${pct}%)`;
  }
}
