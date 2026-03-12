import { Component, inject, signal, computed, effect, ChangeDetectionStrategy, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Title, Meta, DomSanitizer } from '@angular/platform-browser';
import { CalculationService, CalculatorInputs, ExtraPaymentResult } from '../services/calculation.service';
import { EmailCapturePopupComponent } from '../components/email-capture-popup/email-capture-popup.component';
import { ResultsDisplayComponent, ResultsData } from '../components/results-display/results-display.component';
import { CtaCardsComponent, CTAEvent } from '../components/cta-cards/cta-cards.component';

// Declare gtag global for analytics
declare let gtag: Function;

interface CalculatorState {
  homePrice: number;
  downPayment: number;
  interestRate: number;
  loanTermYears: number;
  propertyTaxRate: number;
  insurancePerYear: number;
  extraMonthlyPayment: number;
  oneTimePayment: number;
}

@Component({
  selector: 'app-early-mortgage-payoff-calculator',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ResultsDisplayComponent,
  ],
  templateUrl: './early-mortgage-payoff-calculator.component.html',
  styleUrl: './early-mortgage-payoff-calculator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EarlyMortgagePayoffCalculatorComponent {
  private calculationService: CalculationService = inject(CalculationService);
  private titleService: Title = inject(Title);
  private metaService: Meta = inject(Meta);
  private renderer: Renderer2 = inject(Renderer2);
  private sanitizer: DomSanitizer = inject(DomSanitizer);

  /* ─────────────────────────────────────────────────────────────── */
  /* INPUT SIGNALS - User Input State */
  /* ─────────────────────────────────────────────────────────────── */

  homePrice = signal<number>(400000);
  downPayment = signal<number>(80000);
  interestRate = signal<number>(6.5);
  loanTermYears = signal<number>(30);
  propertyTaxRate = signal<number>(1.2);
  insurancePerYear = signal<number>(1200);
  extraMonthlyPayment = signal<number>(0);
  oneTimePayment = signal<number>(0);

  /* ─────────────────────────────────────────────────────────────── */
  /* CALCULATION RESULT SIGNALS */
  /* ─────────────────────────────────────────────────────────────── */

  monthlyPayment = signal<number>(0);
  totalMonthlyCost = signal<number>(0);
  totalInterest = signal<number>(0);
  payoffResults = signal<ExtraPaymentResult | null>(null);

  /* ─────────────────────────────────────────────────────────────── */
  /* UI STATE SIGNALS */
  /* ─────────────────────────────────────────────────────────────── */

  isCalculating = signal<boolean>(false);
  showEmailPopup = signal<boolean>(false);
  showResults = signal<boolean>(false);
  emailCaptured = signal<boolean>(false);

  /* ─────────────────────────────────────────────────────────────── */
  /* COMPUTED SIGNALS - Derived Values */
  /* ─────────────────────────────────────────────────────────────── */

  principal = computed(() =>
    this.calculationService.calculatePrincipal(
      this.homePrice(),
      this.downPayment()
    )
  );

  downPaymentPercent = computed(() =>
    this.calculationService.calculateDownPaymentPercent(
      this.homePrice(),
      this.downPayment()
    )
  );

  monthlyTax = computed(() =>
    (this.homePrice() * this.propertyTaxRate() / 100) / 12
  );

  monthlyInsurance = computed(() => this.insurancePerYear() / 12);

  monthlyPMI = computed(() => {
    if (this.downPaymentPercent() >= 20) return 0;
    return (this.principal() * 0.005) / 12;
  });

  hasExtraPayments = computed(() =>
    this.extraMonthlyPayment() > 0 || this.oneTimePayment() > 0
  );

  interestSaved = computed(() =>
    this.payoffResults()?.interestSaved ?? 0
  );

  yearsSaved = computed(() =>
    this.payoffResults()?.yearsSaved ?? 0
  );

  // Format computed values for display
  formattedMonthlyPayment = computed(() =>
    this.calculationService.formatCurrency(this.monthlyPayment())
  );

  formattedTotalMonthlyCost = computed(() =>
    this.calculationService.formatCurrency(this.totalMonthlyCost())
  );

  formattedTotalInterest = computed(() =>
    this.calculationService.formatCurrency(this.totalInterest())
  );

  formattedInterestSaved = computed(() =>
    this.calculationService.formatCurrency(this.interestSaved())
  );

  formattedMonthlyTax = computed(() =>
    this.calculationService.formatCurrency(this.monthlyTax())
  );

  formattedMonthlyInsurance = computed(() =>
    this.calculationService.formatCurrency(this.monthlyInsurance())
  );

  formattedMonthlyPMI = computed(() =>
    this.calculationService.formatCurrency(this.monthlyPMI())
  );

  /* Results data for display component */
  resultsData = computed(() => {
    const results = this.payoffResults();
    if (!results) return null;

    return {
      monthlyPayment: this.monthlyPayment(),
      originalTotalInterest: this.totalInterest(),
      newTotalInterest: results.newTotalInterest,
      interestSaved: results.interestSaved,
      monthsToPayoff: results.monthsToPayoff,
      yearsSaved: results.yearsSaved,
      originalPayoffDate: results.originalPayoffDate,
      newPayoffDate: results.newPayoffDate,
      extraMonthlyPayment: this.extraMonthlyPayment(),
    } as ResultsData;
  });

  /* ─────────────────────────────────────────────────────────────── */
  /* EFFECTS - Reactive Logic */
  /* ─────────────────────────────────────────────────────────────── */

  constructor() {
    // Calculate mortgage on input changes
    effect(() => {
      // These reads create dependencies
      this.homePrice();
      this.downPayment();
      this.interestRate();
      this.loanTermYears();
      this.extraMonthlyPayment();
      this.oneTimePayment();

      this.calculateMortgage();
    });

    // Track email capture event
    effect(() => {
      if (this.emailCaptured()) {
        this.showEmailPopup.set(false);
        this.showResults.set(true);

        if (typeof gtag !== 'undefined') {
          gtag('event', 'email_captured', {
            event_source: 'calculator',
          });
        }
      }
    });

    // Scroll to results and show email modal after delay
    effect(() => {
      if (this.showResults()) {
        // Scroll to results area smoothly (works on mobile & desktop)
        setTimeout(() => {
          const resultsElement = document.getElementById('results-anchor');
          if (resultsElement) {
            // Use 'nearest' for better mobile behavior, or 'center' for better visibility
            const isMobile = window.innerWidth < 768;
            resultsElement.scrollIntoView({ 
              behavior: 'smooth', 
              block: isMobile ? 'center' : 'start'
            });
          }
        }, 50); // Increased timeout to ensure rendering complete

        // Show email modal after 2500ms
        // setTimeout(() => {
        //   this.showEmailPopup.set(true);
        // }, 2500);
      }
    });

    // Inject FAQ schema for SEO
    this.injectFaqSchema();
  }

  /**
   * Calculate standard mortgage payment and extra payment savings
   * Called when any input signal changes (via effect)
   */
  calculateMortgage(): void {
    const principal = this.principal();

    if (principal <= 0) {
      this.monthlyPayment.set(0);
      this.totalMonthlyCost.set(0);
      this.totalInterest.set(0);
      return;
    }

    // Calculate standard monthly payment (P&I only)
    const monthlyRate = this.interestRate() / 100 / 12;
    const numberOfPayments = this.loanTermYears() * 12;

    const monthlyPayment = this.calculationService.calculateMonthlyPayment(
      principal,
      this.interestRate(),
      this.loanTermYears()
    );

    this.monthlyPayment.set(monthlyPayment);

    // Calculate total monthly cost including taxes, insurance, PMI
    const totalActualMonthlyCost = monthlyPayment + this.monthlyTax() + this.monthlyInsurance() + this.monthlyPMI();
    this.totalMonthlyCost.set(totalActualMonthlyCost);

    // Calculate total interest without extra payments
    const totalInterest = this.calculationService.calculateTotalInterest(
      monthlyPayment,
      this.loanTermYears(),
      principal
    );
    this.totalInterest.set(totalInterest);

    // Calculate with extra payments if applicable
    if (this.hasExtraPayments()) {
      const inputs: CalculatorInputs & {
        monthlyPayment: number;
        originalTotalInterest: number;
      } = {
        homePrice: this.homePrice(),
        downPayment: this.downPayment(),
        interestRate: this.interestRate(),
        loanTermYears: this.loanTermYears(),
        propertyTaxRate: this.propertyTaxRate(),
        insurancePerYear: this.insurancePerYear(),
        extraMonthlyPayment: this.extraMonthlyPayment(),
        oneTimePayment: this.oneTimePayment(),
        monthlyPayment,
        originalTotalInterest: totalInterest,
      };

      const results = this.calculationService.calculateWithExtraPayments(inputs);
      this.payoffResults.set(results);

      // Show results when calculations complete
      this.showResults.set(true);

      // Track calculation event
      if (typeof gtag !== 'undefined') {
        gtag('event', 'calculator_complete', {
          loan_amount: principal,
          interest_rate: this.interestRate(),
          extra_payment: this.extraMonthlyPayment(),
          savings_amount: results.interestSaved,
          years_saved: results.yearsSaved,
        });
      }
    } else {
      this.payoffResults.set(null);
      // Show basic results even without extra payments
      this.showResults.set(true);
    }
  }

  /**
   * Set home price preset
   */
  setPreset(price: number): void {
    this.homePrice.set(price);

    if (typeof gtag !== 'undefined') {
      gtag('event', 'preset_selected', {
        price_point: price,
      });
    }
  }

  /**
   * Set extra payment preset
   */
  setExtraPaymentPreset(amount: number): void {
    this.extraMonthlyPayment.set(amount);
  }

  /**
   * Get gradient background for range input
   * Used for visual feedback on sliders
   */
  getRangeBackground(value: number, min: number, max: number): string {
    const percentage = ((value - min) / (max - min)) * 100;
    return `linear-gradient(to right, #4169e1 0%, #4169e1 ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`;
  }

  /**
   * Handle CTA click event
   */
  onCtaClick(event: CTAEvent): void {
    if (event.type === 'pdf') {
      // Handle PDF download
      window.open('/download-report', '_blank');
    } else if (event.type === 'refinance') {
      // Handle affiliate redirect
      window.open('https://www.example.com/refinance-rates', '_blank');
    } else if (event.type === 'consultation') {
      // Handle consultation booking
      window.open('/book-consultation', '_blank');
    }
  }

  /**
   * Handle email capture
   */
  onEmailCaptured(): void {
    this.emailCaptured.set(true);
  }

  /**
   * Close email popup without capturing
   * User can see results without email
   */
  onEmailPopupClosed(): void {
    this.showEmailPopup.set(false);
    this.showResults.set(true);
  }

  /**
   * Inject FAQ schema into document head for SEO
   */
  private injectFaqSchema(): void {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'Is it smart to pay off a mortgage early?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Paying off a mortgage early can be smart if you have a high interest rate (6%+), have stable income, and have an emergency fund. It guarantees a return equal to your mortgage rate and reduces psychological stress. However, if rates are low (under 4%) and you have better investment returns elsewhere, investing might be optimal.'
          }
        },
        {
          '@type': 'Question',
          'name': 'How much interest can I save with extra payments?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Interest savings depend on loan amount, rate, and extra payment frequency. On a $300,000 mortgage at 6.5%, adding just $200/month extra can save $60,000+ in interest and pay off the loan 7+ years earlier. Use our calculator to see exact savings for your situation.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Is paying biweekly better than monthly?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Paying biweekly (every two weeks) can be beneficial because you make 26 payments per year instead of 12 monthly payments, which equals 13 months of payments annually. This results in one extra full payment per year going directly to principal, typically saving $30,000+ in interest over the loan term.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Should I invest instead of paying off my mortgage early?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'This depends on your mortgage rate versus potential investment returns. If your mortgage rate is 3-4% and stock market returns average 8%+, investing may be better. However, paying off a mortgage is lower risk, guaranteed returns, and provides peace of mind. Many people benefit from a balanced approach: pay extra when rates are high and invest when rates are low.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Does paying off a mortgage early hurt credit?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Paying off a mortgage early does not hurt your credit score. In fact, it demonstrates responsible financial management. Your score may temporarily dip slightly when the account closes, but this is minor and temporary. The long-term benefit of being debt-free far outweighs any temporary score fluctuation.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Can I pay off my mortgage early without penalty?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Most mortgages in the US have no prepayment penalties, meaning you can pay extra or pay off the loan early without fees. However, some loans (particularly those with adjustable rates or from certain lenders) may have prepayment penalties. Check your mortgage documents or contact your lender to confirm you have no prepayment restrictions.'
          }
        }
      ]
    };

    // Create script element
    const script = this.renderer.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(faqSchema);
    
    // Append to head
    this.renderer.appendChild(document.head, script);
  }
}
