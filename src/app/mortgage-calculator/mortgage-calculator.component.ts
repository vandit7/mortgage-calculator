import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { EarlyMortgagePayoffCalculatorComponent } from '../early-mortgage-payoff-calculator/early-mortgage-payoff-calculator.component';

@Component({
  selector: 'app-mortgage-calculator',
  standalone: true,
  imports: [EarlyMortgagePayoffCalculatorComponent],
  templateUrl: './mortgage-calculator.component.html',
  styleUrl: './mortgage-calculator.component.scss',
})
export class MortgageCalculatorComponent implements OnInit {
  constructor(private title: Title, private meta: Meta) {}

  ngOnInit(): void {
    this.title.setTitle('Mortgage Calculator - Calculate Your Monthly Payments | USA');
    this.meta.updateTag({
      name: 'description',
      content: 'Free mortgage calculator to estimate your monthly payments, including principal, interest, taxes, and insurance. Get accurate calculations for US mortgages.'
    });
    this.meta.addTag({ name: 'canonical', content: '/mortgage-calculator' });
    this.meta.addTag({ property: 'og:title', content: 'Mortgage Calculator - Calculate Your Monthly Payments' });
    this.meta.addTag({
      property: 'og:description',
      content: 'Estimate your monthly mortgage payments with our free calculator. Includes PMI, taxes, and insurance.'
    });
    this.meta.addTag({ property: 'og:type', content: 'website' });
  }
}