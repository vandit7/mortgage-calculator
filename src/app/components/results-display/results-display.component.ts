import { Component, inject, input, signal, computed, effect, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculationService } from '../../services/calculation.service';

export interface ResultsData {
  monthlyPayment: number;
  originalTotalInterest: number;
  newTotalInterest: number;
  interestSaved: number;
  monthsToPayoff: number;
  yearsSaved: number;
  originalPayoffDate: Date;
  newPayoffDate: Date;
  extraMonthlyPayment: number;
}

@Component({
  selector: 'app-results-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './results-display.component.html',
  styleUrl: './results-display.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsDisplayComponent {
  private calculationService = inject(CalculationService);

  // Inputs
  resultsData = input.required<ResultsData>();
  isVisible = input.required<boolean>();

  // Signals
  animationComplete = signal<boolean>(false);

  // Computed signals for formatting
  formattedSavings = computed(() =>
    this.calculationService.formatCurrency(this.resultsData().interestSaved)
  );

  formattedMonthlyPayment = computed(() =>
    this.calculationService.formatCurrency(this.resultsData().monthlyPayment)
  );

  formattedExtraPayment = computed(() =>
    this.calculationService.formatCurrency(this.resultsData().extraMonthlyPayment)
  );

  formattedNewPayoffDate = computed(() =>
    this.calculationService.formatDate(this.resultsData().newPayoffDate)
  );

  formattedOriginalPayoffDate = computed(() =>
    this.calculationService.formatDate(this.resultsData().originalPayoffDate)
  );

  formattedOriginalInterest = computed(() =>
    this.calculationService.formatCurrency(this.resultsData().originalTotalInterest)
  );

  formattedNewInterest = computed(() =>
    this.calculationService.formatCurrency(this.resultsData().newTotalInterest)
  );

  // Emotional benefit messaging
  emotionalBenefits = computed(() => {
    const savings = this.resultsData().interestSaved;
    const yearsEarned = this.resultsData().yearsSaved;

    const benefits = [];

    // Tesla or car reference
    if (savings >= 50000) {
      benefits.push({
        emoji: '🚗',
        text: `Buys a new ${savings > 100000 ? 'Tesla Model S' : 'Tesla Model Y'}`,
      });
    }

    // Vacation reference
    if (savings >= 30000) {
      const vacations = Math.floor(savings / 15000);
      benefits.push({
        emoji: '🏖️',
        text: `${vacations} weeks of family vacations`,
      });
    }

    // College fund reference
    if (savings >= 50000) {
      benefits.push({
        emoji: '🎓',
        text: "Your kid's 4-year college fund",
      });
    }

    // Retirement reference
    if (yearsEarned >= 2) {
      benefits.push({
        emoji: '⏰',
        text: `Retire ${yearsEarned} years earlier`,
      });
    }

    return benefits;
  });

  /**
   * Trigger animation when component is first displayed
   * This creates the count-up effect on the savings number
   */
  constructor() {
    effect(() => {
      if (this.isVisible()) {
        // Small delay to ensure DOM is ready
        setTimeout(() => {
          this.animationComplete.set(true);
        }, 100);
      }
    });
  }

  /**
   * Track key in @for loop for performance
   */
  trackByIndex(index: number): number {
    return index;
  }

  /**
   * Track benefit by emoji for stability
   */
  trackBenefitByEmoji(benefit: { emoji: string; text: string }): string {
    return benefit.emoji;
  }
}
