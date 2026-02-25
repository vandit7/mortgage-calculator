import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { CommonModule, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-biweekly-vs-monthly',
  templateUrl: './biweekly-vs-monthly.component.html',
  styleUrls: ['./biweekly-vs-monthly.component.scss'],
  standalone: true,
  imports: [CommonModule, DecimalPipe]
})
export class BiweeklyVsMonthlyComponent implements OnInit {

  // Example values
  loanAmount = 300000;
  interestRate = 6.5;
  monthlyPayment = 1896.20;
  biweeklyPayment = 948.10;
  standardYears = 30;
  acceleratedYears = 27;
  monthlyTotalInterest = 382632;
  biweeklyTotalInterest = 343670;
  interestSaved = 38962;
  yearsShaved = 3;

  comparisonTable = [
    {
      metric: 'Payment Frequency',
      monthly: '12 payments/year',
      biweekly: '26 payments/year'
    },
    {
      metric: 'Payment Amount',
      monthly: '$1,896.20',
      biweekly: '$948.10'
    },
    {
      metric: 'Annual Payments',
      monthly: '12 (~$22,754)',
      biweekly: '13 (~$12,345)'
    },
    {
      metric: 'Total Interest (30 yrs)',
      monthly: '$382,632',
      biweekly: '$343,670'
    },
    {
      metric: 'Payoff Timeline',
      monthly: '30 years',
      biweekly: '27 years'
    },
    {
      metric: 'Interest Saved',
      monthly: '-',
      biweekly: '$38,962'
    },
    {
      metric: 'Difficulty Level',
      monthly: 'Easy',
      biweekly: 'Moderate'
    }
  ];

  faqItems = [
    {
      question: 'Is biweekly payment always better than monthly?',
      answer: 'Not always "better"—it depends on your goal. Biweekly payments do save interest and accelerate payoff, but require discipline to set up and maintain. If you can stick to an extra principal payment plan monthly, that might be simpler and equally effective. Biweekly is ideal if it aligns naturally with your paycheck schedule.'
    },
    {
      question: 'Can I switch to biweekly payments without lender approval?',
      answer: 'Most lenders allow biweekly payments, but you must set them up through your lender or a third-party processor. Never make payments directly to a biweekly service without confirming they\'re authorized. Always verify with your loan servicer first—some charge small fees to facilitate biweekly arrangements, while others offer it for free.'
    },
    {
      question: 'How much faster can I pay off my mortgage with biweekly payments?',
      answer: 'For a $300,000 mortgage at 6.5%, biweekly payments shave about 3 years off a 30-year loan. On a $500,000 loan, you could save 4-5 years. The exact timeframe depends on your loan amount, interest rate, and remaining loan term. Use our extra payment calculator to see your specific savings.'
    }
  ];

  constructor(
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit(): void {
    // SEO: Set page title and meta description
    this.titleService.setTitle('Biweekly vs Monthly Mortgage Payments: Savings & Comparison');
    this.metaService.updateTag({
      name: 'description',
      content: 'Compare biweekly and monthly mortgage payments. See how biweekly payments save you thousands in interest and cut years off your loan term with detailed calculations.'
    });

    // SEO: Add canonical URL
    this.metaService.updateTag({
      rel: 'canonical',
      href: 'https://yoursite.com/biweekly-vs-monthly'
    });

    // SEO: Open Graph tags
    this.metaService.updateTag({
      property: 'og:title',
      content: 'Biweekly vs Monthly Mortgage Payments: Complete Comparison'
    });
    this.metaService.updateTag({
      property: 'og:description',
      content: 'Learn how biweekly mortgage payments save $40,000+ in interest. Complete comparison table and real examples.'
    });

    // SEO: Add JSON-LD FAQ schema
    this.addFaqSchema();
  }

  addFaqSchema(): void {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: this.faqItems.map(item => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer
        }
      }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(faqSchema);
    document.head.appendChild(script);
  }
}
