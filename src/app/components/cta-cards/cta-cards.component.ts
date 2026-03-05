import { Component, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

declare let gtag: Function;

export type CTAType = 'pdf' | 'refinance' | 'consultation';

export interface CTAEvent {
  type: CTAType;
  timestamp: Date;
}

@Component({
  selector: 'app-cta-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cta-cards.component.html',
  styleUrl: './cta-cards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CtaCardsComponent {
  // Output events for parent to handle
  ctaClicked = output<CTAEvent>();

  /**
   * Monetization CTAs:
   * 1. Download PDF Report ($7) - Paid product
   * 2. Check Refinance Rates (Free) - Affiliate leads ($50-300 per lead)
   * 3. Book Strategy Call ($49-299) - Consultation/coaching
   */

  onCtaClick(type: CTAType): void {
    this.ctaClicked.emit({
      type,
      timestamp: new Date(),
    });

    // Track conversion event
    if (typeof gtag !== 'undefined') {
      const eventMap = {
        pdf: 'cta_pdf_click',
        refinance: 'cta_refinance_click',
        consultation: 'cta_consultation_click',
      };

      gtag('event', eventMap[type], {
        cta_type: type,
        timestamp: new Date().toISOString(),
      });
    }
  }
}
