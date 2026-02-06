import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { EarlyMortgagePayoffCalculatorComponent } from '../early-mortgage-payoff-calculator/early-mortgage-payoff-calculator.component';

@Component({
  selector: 'app-refinance-calculator',
  standalone: true,
  imports: [EarlyMortgagePayoffCalculatorComponent],
  templateUrl: './refinance-calculator.component.html',
  styleUrl: './refinance-calculator.component.scss',
})
export class RefinanceCalculatorComponent implements OnInit {
  constructor(private title: Title, private meta: Meta) {}

  ngOnInit(): void {
    this.title.setTitle('Mortgage Refinance Calculator - Should You Refinance? | USA');
    this.meta.updateTag({
      name: 'description',
      content: 'Calculate if refinancing your mortgage makes sense. Compare current vs. new rates, terms, and monthly payments to see potential savings.'
    });
    this.meta.addTag({ name: 'canonical', content: '/refinance-calculator' });
    this.meta.addTag({ property: 'og:title', content: 'Mortgage Refinance Calculator - Should You Refinance?' });
    this.meta.addTag({
      property: 'og:description',
      content: 'Use our refinance calculator to determine if lowering your interest rate or changing loan terms will save you money.'
    });
    this.meta.addTag({ property: 'og:type', content: 'website' });
  }
}