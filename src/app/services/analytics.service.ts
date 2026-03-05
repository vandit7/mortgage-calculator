import { Injectable, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private router = inject(Router);
  private isProduction = false;

  constructor() {
    this.initializeTracking();
  }

  /**
   * Initialize tracking events
   * Subscribe to router events for page tracking
   */
  private initializeTracking(): void {
    // Track page views
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.pageView(event.urlAfterRedirects);
      });
  }

  /**
   * Track page view with Google Analytics 4
   */
  pageView(path: string): void {
    if (typeof gtag === 'undefined') return;

    gtag('config', 'GA_MEASUREMENT_ID', {
      page_path: path,
      page_title: document.title,
    });

    if (!this.isProduction) {
      console.log('[Analytics] Page view:', path);
    }
  }

  /**
   * Track custom event with Google Analytics 4
   */
  event(
    eventName: string,
    eventData: Record<string, any> = {}
  ): void {
    if (typeof gtag === 'undefined') return;

    gtag('event', eventName, {
      ...eventData,
      timestamp: new Date().toISOString(),
    });

    if (!this.isProduction) {
      console.log('[Analytics] Event:', eventName, eventData);
    }
  }

  /**
   * Track calculator completion
   */
  trackCalculation(data: {
    loanAmount: number;
    interestRate: number;
    extraPayment: number;
    savingsAmount: number;
    yearsSaved: number;
  }): void {
    this.event('calculator_complete', {
      loan_amount: data.loanAmount,
      interest_rate: data.interestRate,
      extra_payment: data.extraPayment,
      savings_amount: data.savingsAmount,
      years_saved: data.yearsSaved,
      loan_amount_range: this.getLoanAmountRange(data.loanAmount),
      savings_range: this.getSavingsRange(data.savingsAmount),
    });
  }

  /**
   * Track email capture
   */
  trackEmailCapture(source: string): void {
    this.event('email_captured', {
      source,
    });
  }

  /**
   * Track CTA click
   */
  trackCtaClick(ctaType: string): void {
    this.event('cta_click', {
      cta_type: ctaType,
    });
  }

  /**
   * Track affiliate conversion
   */
  trackAffiliateConversion(partner: string): void {
    this.event('affiliate_conversion', {
      partner,
    });
  }

  /**
   * Track product purchase
   */
  trackProductPurchase(productId: string, price: number): void {
    this.event('purchase', {
      items: [
        {
          item_id: productId,
          price,
          quantity: 1,
        },
      ],
      value: price,
      currency: 'USD',
    });
  }

  /**
   * Set user properties
   */
  setUserProperties(properties: Record<string, any>): void {
    if (typeof gtag === 'undefined') return;

    gtag('config', 'GA_MEASUREMENT_ID', properties);
  }

  /**
   * Helper: Get loan amount range
   */
  private getLoanAmountRange(amount: number): string {
    if (amount < 200000) return '<200K';
    if (amount < 400000) return '200-400K';
    if (amount < 600000) return '400-600K';
    return '>600K';
  }

  /**
   * Helper: Get savings range
   */
  private getSavingsRange(amount: number): string {
    if (amount < 50000) return '<50K';
    if (amount < 100000) return '50-100K';
    if (amount < 150000) return '100-150K';
    return '>150K';
  }
}
