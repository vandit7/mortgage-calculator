import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { EarlyMortgagePayoffCalculatorComponent } from '../early-mortgage-payoff-calculator/early-mortgage-payoff-calculator.component';

@Component({
  selector: 'app-mortgage-payoff-with-extra-payments',
  standalone: true,
  imports: [EarlyMortgagePayoffCalculatorComponent],
  templateUrl: './mortgage-payoff-with-extra-payments.component.html',
  styleUrl: './mortgage-payoff-with-extra-payments.component.scss',
})
export class MortgagePayoffWithExtraPaymentsComponent implements OnInit {
  constructor(private title: Title, private meta: Meta) {}

  ngOnInit(): void {
    this.title.setTitle('Mortgage Payoff Calculator with Extra Payments USA - Save Thousands on Interest');
    this.meta.updateTag({
      name: 'description',
      content: 'Use our mortgage payoff calculator with extra payments USA to see how making additional payments can save you thousands in interest. Calculate your savings today.'
    });
    this.meta.addTag({ name: 'canonical', content: '/mortgage-payoff-with-extra-payments' });
    this.meta.addTag({ property: 'og:title', content: 'Mortgage Payoff Calculator with Extra Payments USA' });
    this.meta.addTag({
      property: 'og:description',
      content: 'Calculate how extra payments on your mortgage can reduce your loan term and save you money on interest in the USA.'
    });
    this.meta.addTag({ property: 'og:type', content: 'website' });
  }
}