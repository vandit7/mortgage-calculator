import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { CommonModule, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-payoff-15-years',
  templateUrl: './payoff-15-years.component.html',
  styleUrls: ['./payoff-15-years.component.scss'],
  standalone: true,
  imports: [CommonModule, DecimalPipe]
})
export class Payoff15YearsComponent implements OnInit {
  
  // Example calculation values
  loanAmount = 300000;
  interestRate = 6.5;
  monthlyPayment = 1896.20;
  standardMonths = 360; // 30 years
  acceleratedMonths = 180; // 15 years
  extraMonthlyPayment = 950;
  standardInterestTotal = 382632;
  acceleratedInterestTotal = 141498;
  interestSaved = 241134;
  
  faqItems = [
    {
      question: 'How much extra do I need to pay monthly to pay off a 30-year mortgage in 15 years?',
      answer: 'For a $300,000 mortgage at 6.5%, you\'d need to pay approximately $950 extra per month on top of your regular $1,896 payment. The exact amount depends on your loan balance, interest rate, and years remaining. Use our early payoff calculator to determine your specific number.'
    },
    {
      question: 'Does paying off my mortgage early hurt my credit score?',
      answer: 'No, paying off your mortgage early actually demonstrates financial responsibility. While closing the account might cause a small temporary dip, your overall credit profile improves significantly as your debt-to-income ratio decreases—a major factor in credit scoring models. Your score typically rebounds within a few months.'
    },
    {
      question: 'Are there prepayment penalties for paying off my mortgage early?',
      answer: 'Most conventional mortgages have no prepayment penalties, allowing you to pay off early without fees. However, some FHA, VA, and USDA loans may have restrictions. Always review your mortgage documents or contact your lender to confirm before making extra payments.'
    }
  ];

  constructor(
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit(): void {
    // SEO: Set page title and meta description
    this.titleService.setTitle('Pay Off 30-Year Mortgage in 15 Years | Mortgage Payoff Strategy');
    this.metaService.updateTag({
      name: 'description',
      content: 'Learn how to pay off a 30-year mortgage in 15 years with proven strategies. Calculate your savings with detailed examples and actionable steps.'
    });
    
    // SEO: Add canonical URL
    this.metaService.updateTag({
      rel: 'canonical',
      href: 'https://yoursite.com/payoff-15-years'
    });

    // SEO: Open Graph tags
    this.metaService.updateTag({
      property: 'og:title',
      content: 'Pay Off 30-Year Mortgage in 15 Years | Expert Strategy Guide'
    });
    this.metaService.updateTag({
      property: 'og:description',
      content: 'Discover how to accelerate your mortgage payoff and save $200K+ in interest. Detailed strategy with real calculations and expert tips.'
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

  calculatePayoff(principal: number, rate: number, years: number): any {
    const monthlyRate = rate / 100 / 12;
    const numberOfPayments = years * 12;
    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) 
      / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    const totalInterest = (monthlyPayment * numberOfPayments) - principal;
    
    return {
      monthlyPayment: monthlyPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2)
    };
  }
}
