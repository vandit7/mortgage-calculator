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
// Loan inputs
  homePrice: number = 400000;
  downPayment: number = 80000;
  interestRate: number = 6.5;
  loanTerm: number = 30;
  propertyTaxRate: number = 1.2;
  insurancePerYear: number = 1200;

  // Extra payment inputs
  extraMonthlyPayment: number = 0;
  oneTimePayment: number = 0;

  // Standard calculations
  monthlyPayment: number = 0;
  totalMonthlyCost: number = 0;
  totalInterest: number = 0;

  // Early payoff calculations
  totalInterestWithExtra: number = 0;
  interestSaved: number = 0;
  yearsSaved: number = 0;
  newLoanTerm: number = 0;
  originalPayoffDate: string = '';
  newPayoffDate: string = '';

  ngOnInit() {
    this.calculateMortgage();
  }

  setPreset(price: number) {
    this.homePrice = price;
    this.calculateMortgage();
  }

  calculateMortgage() {
    const principal = this.homePrice - this.downPayment;
    const monthlyRate = this.interestRate / 100 / 12;
    const numberOfPayments = this.loanTerm * 12;

    // Calculate standard monthly payment (P&I only)
    if (monthlyRate === 0) {
      this.monthlyPayment = principal / numberOfPayments;
    } else {
      this.monthlyPayment = principal * 
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    }

    // Calculate total monthly cost including taxes and insurance
    const monthlyTax = (this.homePrice * this.propertyTaxRate / 100) / 12;
    const monthlyInsurance = this.insurancePerYear / 12;
    
    // Add PMI if down payment is less than 20%
    const downPaymentPercent = (this.downPayment / this.homePrice) * 100;
    let pmi = 0;
    if (downPaymentPercent < 20) {
      pmi = principal * 0.005 / 12; // 0.5% annual PMI
    }

    this.totalMonthlyCost = this.monthlyPayment + monthlyTax + monthlyInsurance + pmi;

    // Calculate total interest without extra payments
    this.totalInterest = (this.monthlyPayment * numberOfPayments) - principal;

    // Calculate with extra payments
    if (this.extraMonthlyPayment > 0 || this.oneTimePayment > 0) {
      this.calculateWithExtraPayments(principal, monthlyRate);
    } else {
      // Reset savings metrics
      this.totalInterestWithExtra = this.totalInterest;
      this.interestSaved = 0;
      this.yearsSaved = 0;
      this.newLoanTerm = this.loanTerm;
    }

    // Calculate payoff dates
    this.calculatePayoffDates();
  }

  calculateWithExtraPayments(principal: number, monthlyRate: number) {
    let balance = principal;
    let month = 0;
    let totalInterestPaid = 0;
    const maxMonths = this.loanTerm * 12;

    // Apply one-time payment to principal immediately
    if (this.oneTimePayment > 0) {
      balance -= this.oneTimePayment;
    }

    while (balance > 0 && month < maxMonths) {
      month++;
      
      // Calculate interest for this month
      const interestPayment = balance * monthlyRate;
      totalInterestPaid += interestPayment;

      // Calculate principal payment
      let principalPayment = this.monthlyPayment - interestPayment;
      
      // Add extra payment to principal
      principalPayment += this.extraMonthlyPayment;

      // Reduce balance
      balance -= principalPayment;

      // Prevent negative balance
      if (balance < 0) {
        balance = 0;
      }
    }

    this.totalInterestWithExtra = totalInterestPaid;
    this.interestSaved = this.totalInterest - this.totalInterestWithExtra;
    this.newLoanTerm = month / 12;
    this.yearsSaved = this.loanTerm - this.newLoanTerm;
  }

  calculatePayoffDates() {
    const today = new Date();
    
    // Original payoff date
    const originalDate = new Date(today);
    originalDate.setMonth(originalDate.getMonth() + (this.loanTerm * 12));
    this.originalPayoffDate = originalDate.toLocaleDateString('en-US', { 
      month: 'short', 
      year: 'numeric' 
    });

    // New payoff date with extra payments
    const newDate = new Date(today);
    const newMonths = this.newLoanTerm * 12;
    newDate.setMonth(newDate.getMonth() + newMonths);
    this.newPayoffDate = newDate.toLocaleDateString('en-US', { 
      month: 'short', 
      year: 'numeric' 
    });
  }

  getRangeBackground(value: number, min: number, max: number): string {
    const percentage = ((value - min) / (max - min)) * 100;
    return `linear-gradient(to right, #2563eb 0%, #2563eb ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`;
  }
}
