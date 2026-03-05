import { Injectable } from '@angular/core';

export interface MortgageCalculation {
  principal: number;
  monthlyPayment: number;
  totalInterest: number;
  payoffMonths: number;
}

export interface ExtraPaymentResult {
  monthlyPayment: number;
  originalTotalInterest: number;
  newTotalInterest: number;
  interestSaved: number;
  monthsToPayoff: number;
  yearsSaved: number;
  originalPayoffDate: Date;
  newPayoffDate: Date;
}

export interface CalculatorInputs {
  homePrice: number;
  downPayment: number;
  interestRate: number;
  loanTermYears: number;
  propertyTaxRate: number;
  insurancePerYear: number;
  extraMonthlyPayment?: number;
  oneTimePayment?: number;
}

@Injectable({ providedIn: 'root' })
export class CalculationService {
  /**
   * Calculate standard mortgage payment using PMT formula
   * M = P * [r(1+r)^n] / [(1+r)^n - 1]
   * Where:
   * - M = Monthly payment
   * - P = Principal
   * - r = Monthly interest rate
   * - n = Number of payments
   */
  calculateMonthlyPayment(
    principal: number,
    annualInterestRate: number,
    loanTermYears: number
  ): number {
    if (principal <= 0 || loanTermYears <= 0) {
      return 0;
    }

    const monthlyRate = annualInterestRate / 100 / 12;
    const numberOfPayments = loanTermYears * 12;

    // Handle 0% interest rate
    if (monthlyRate === 0) {
      return principal / numberOfPayments;
    }

    const numerator = monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments);
    const denominator = Math.pow(1 + monthlyRate, numberOfPayments) - 1;

    return principal * (numerator / denominator);
  }

  /**
   * Calculate total interest paid over loan term
   */
  calculateTotalInterest(
    monthlyPayment: number,
    loanTermYears: number,
    principal: number
  ): number {
    const totalPaid = monthlyPayment * loanTermYears * 12;
    return totalPaid - principal;
  }

  /**
   * Calculate payoff date from today
   */
  calculatePayoffDate(monthsFromNow: number): Date {
    const date = new Date();
    date.setMonth(date.getMonth() + monthsFromNow);
    return date;
  }

  /**
   * Convert months to years (e.g., 360 months = 30 years)
   */
  monthsToYears(months: number): number {
    return Math.round((months / 12) * 100) / 100;
  }

  /**
   * Calculate principal from home price and down payment
   */
  calculatePrincipal(homePrice: number, downPayment: number): number {
    return Math.max(0, homePrice - downPayment);
  }

  /**
   * Calculate total monthly cost (P&I + taxes + insurance + PMI)
   */
  calculateTotalMonthlyCost(
    monthlyPayment: number,
    propertyTaxRate: number,
    insurancePerYear: number,
    homePrice: number,
    downPaymentPercent: number
  ): { total: number; details: Record<string, number> } {
    const monthlyTax = (homePrice * propertyTaxRate / 100) / 12;
    const monthlyInsurance = insurancePerYear / 12;

    // Calculate PMI (0.5% annual if down payment < 20%)
    let pmi = 0;
    if (downPaymentPercent < 20) {
      const principal = homePrice - (homePrice * downPaymentPercent / 100);
      pmi = (principal * 0.005) / 12;
    }

    const total = monthlyPayment + monthlyTax + monthlyInsurance + pmi;

    return {
      total,
      details: {
        principal: monthlyPayment,
        tax: monthlyTax,
        insurance: monthlyInsurance,
        pmi,
      },
    };
  }

  /**
   * Calculate down payment percentage
   */
  calculateDownPaymentPercent(homePrice: number, downPayment: number): number {
    if (homePrice <= 0) return 0;
    return (downPayment / homePrice) * 100;
  }

  /**
   * Calculate results with extra monthly and one-time payments
   * Uses month-by-month amortization to determine new payoff timeline
   */
  calculateWithExtraPayments(
    inputs: CalculatorInputs & { monthlyPayment: number; originalTotalInterest: number }
  ): ExtraPaymentResult {
    const principal = this.calculatePrincipal(inputs.homePrice, inputs.downPayment);
    const monthlyRate = inputs.interestRate / 100 / 12;
    const extraMonthly = inputs.extraMonthlyPayment || 0;
    const extraOneTime = inputs.oneTimePayment || 0;
    const originalPayoffMonths = inputs.loanTermYears * 12;

    let balance = principal - extraOneTime; // Apply one-time payment upfront
    let month = 0;
    let totalInterestPaid = 0;

    // Amortize the loan with extra payments
    while (balance > 0 && month < originalPayoffMonths * 2) {
      // 2x original term as safety limit
      const interestPayment = balance * monthlyRate;
      let principalPayment = inputs.monthlyPayment - interestPayment;

      // Add extra monthly payment to principal
      principalPayment += extraMonthly;

      // If remaining balance is less than payment due, pay it off
      if (balance < principalPayment) {
        principalPayment = balance;
      }

      totalInterestPaid += interestPayment;
      balance -= principalPayment;
      month++;

      // Guard against infinite loop
      if (month > originalPayoffMonths * 2) {
        console.warn('Calculation exceeded maximum iterations');
        break;
      }
    }

    const originalPayoffDate = this.calculatePayoffDate(originalPayoffMonths);
    const newPayoffDate = this.calculatePayoffDate(month);
    const monthsSaved = originalPayoffMonths - month;
    const yearsSaved = this.monthsToYears(monthsSaved);
    const interestSaved =
      inputs.originalTotalInterest - totalInterestPaid;

    return {
      monthlyPayment: inputs.monthlyPayment,
      originalTotalInterest: inputs.originalTotalInterest,
      newTotalInterest: totalInterestPaid,
      interestSaved,
      monthsToPayoff: month,
      yearsSaved,
      originalPayoffDate,
      newPayoffDate,
    };
  }

  /**
   * Format currency for display
   */
  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  }

  /**
   * Format number with commas
   */
  formatNumber(value: number, decimals = 0): string {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value);
  }

  /**
   * Format date as "Month Year"
   */
  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  }
}
