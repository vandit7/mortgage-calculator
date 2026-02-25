import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: number;
  date: string;
  icon: string;
}

@Component({
  selector: 'app-blog-resources',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './blog-resources.component.html',
  styleUrl: './blog-resources.component.scss',
})
export class BlogResourcesComponent implements OnInit {
  blogPosts: BlogPost[] = [
    {
      id: 1,
      title: 'How to Pay Off Your Mortgage 10 Years Early',
      excerpt: 'Discover proven strategies that thousands of Americans use to accelerate their mortgage payoff and save big on interest.',
      content: `Paying off your mortgage 10 years early is more achievable than you think. It doesn't always require a six-figure income or major life changes. Instead, it's about smart strategy and consistent action.

## The Bi-Weekly Payment Strategy
The simplest way to shave years off your mortgage is bi-weekly payments. Instead of making one monthly payment of $1,500, split it into two $750 payments every two weeks. Over a year, you'll make 26 bi-weekly payments, which equals 13 monthly payments. That's one extra full payment every year!

Over a 30-year mortgage, this alone can knock 5-7 years off your loan and save you over $100,000 in interest.

## The "Round Up" Method
If your mortgage payment is $1,847, round it to $1,900 every month. The extra $53 might seem small, but it adds up to $636 per year. On a $300,000 loan at 6.5%, this could save you months of payments.

## Lump Sum Payments
When you get a tax refund, bonus, or inheritance, consider putting some or all of it toward your principal. A one-time $5,000 payment early in your mortgage can save tens of thousands in interest because it compounds over the remaining years.

## Refinance to a Shorter Term
If mortgage rates drop, you might refinance from a 30-year to a 15-year mortgage. Your payment will be higher, but you'll save dramatically on interest. Our calculator can help you compare options.

The key is consistency. Even small extra payments work because of compound interest working in your favor.`,
      category: 'Strategy',
      readTime: 5,
      date: '2024-02-10',
      icon: '🚀'
    },
    {
      id: 2,
      title: 'Mortgage Payoff vs. Investing: Which Is Right for You?',
      excerpt: 'A detailed comparison to help you decide whether early mortgage payoff or investing is the better choice for your financial goals.',
      content: `One of the biggest financial decisions homeowners face is whether to aggressively pay down their mortgage or invest extra money in stocks, bonds, or retirement accounts. The answer depends on several factors.

## Compare Interest Rates
The primary consideration is your mortgage rate versus expected investment returns. If your mortgage rate is 6.5% and you believe you can reliably earn 8%+ in the stock market, investing might yield better returns mathematically.

However, mortgage payoff is guaranteed. You know exactly what rate you're "earning" by paying off a 6.5% mortgage. Stock market returns are unpredictable and come with risk.

## Tax Advantages
Mortgage interest is less deductible than it used to be due to higher standard deductions. Meanwhile, 401(k)s and IRAs offer significant tax benefits. This can make investing more attractive from a tax perspective.

## Risk Tolerance
If you're risk-averse and sleep better knowing your home will be paid off sooner, that peace of mind has value. Conversely, if you're comfortable with market volatility and believe in long-term wealth building through investments, stocks may align better with your temperament.

## The Hybrid Approach
Many successful Americans use a balanced strategy: automate mortgage extra payments at a comfortable level while still contributing to retirement accounts to capture employer matches and tax benefits. This provides both security and growth.

Our calculator helps you see exactly how much you'll save with mortgage payoff so you can make an informed comparison.`,
      category: 'Planning',
      readTime: 6,
      date: '2024-02-08',
      icon: '⚖️'
    },
    {
      id: 3,
      title: 'The True Cost of Your 30-Year Mortgage (You Might Be Shocked)',
      excerpt: 'Learn how much interest you actually pay over 30 years and what it could mean for your financial future.',
      content: `When you sign up for a 30-year mortgage, you often focus on the monthly payment. But the total interest can be shocking once you do the math.

## Real Numbers
On a $300,000 mortgage at 6.5%, your monthly payment is about $1,896. Over 360 payments, you'll pay nearly $682,000 total—which means paying $382,000 just in interest. That's more than the original house price!

At 7% interest (which is realistic in today's market), the numbers get worse. The same $300,000 loan will cost you $716,000 total, with $416,000 going to interest alone.

## How Money Could Be Better Spent
If you paid just $100 extra per month on that 6.5% mortgage, you'd pay off the loan in about 22 years instead of 30, saving over $100,000 in interest. Is there anything better you could do with an extra hundred dollars per month than give it to the bank as interest?

## Your Financial Future
Consider where you'll be in 30 years. Imagine being able to retire with no mortgage payment. Imagine having that money available for travel, family, grandchildren, or charitable giving instead of sending it to a lender.

This is why understanding the true cost is motivating. Our calculator shows not just the monthly payment, but the complete financial picture, helping you make an informed decision about early payoff.`,
      category: 'Education',
      readTime: 4,
      date: '2024-02-05',
      icon: '💸'
    },
    {
      id: 4,
      title: 'Bi-Weekly Mortgages: The Secret Strategy More Americans Should Know',
      excerpt: 'Explore how switching to bi-weekly payments can accelerate your mortgage payoff without major budget changes.',
      content: `One of the simplest yet most effective ways to accelerate your mortgage payoff is switching from monthly to bi-weekly payments. Yet many homeowners have never heard of this strategy.

## How It Works
With monthly payments, you make 12 payments per year. With bi-weekly payments, you make 26 payments over the year—which equals 13 full monthly payments. That one extra payment each year compounds significantly over 30 years.

## The Math
On a $300,000 mortgage at 6.5%:
- Standard 30-year payoff with monthly payments: 360 payments, ~$682,000 total cost
- Same mortgage with bi-weekly payments: Could be paid off in about 23 years with 298 payments, saving over $100,000 in interest

The difference? Just the timing of payments, yet it results in nearly a decade of savings.

## How to Implement
You have a few options:
1. **Ask your lender** - Many banks now offer bi-weekly programs (sometimes with small fees)
2. **DIY approach** - Make a half payment every two weeks using automatic bank transfers
3. **Online tools** - Third-party services can facilitate this for you

## The Best Part
This strategy requires no major lifestyle changes. You're not making bigger payments—you're just making them more frequently. The extra payment comes from the natural rhythm of earning every other week.

If you get paid bi-weekly, this aligns perfectly with your income, making it even easier to stick to.`,
      category: 'Strategy',
      readTime: 4,
      date: '2024-01-28',
      icon: '📅'
    },
    {
      id: 5,
      title: 'Taxes and Mortgage Interest: What You Need to Know',
      excerpt: 'Understand how mortgage interest deductions work and how to maximize tax benefits while paying off your mortgage early.',
      content: `Many homeowners don't realize that mortgage interest is tax-deductible—but this benefit has changed in recent years, and not everyone benefits equally.

## The Deduction Limit
After 2017 tax law changes, you can only deduct mortgage interest on the first $750,000 of principal (couples filing jointly) or $375,000 (single). This means high-value homes have reduced tax benefits, and lower-value homes might not benefit at all.

## The Standard Deduction Comparison
Here's the crucial part: to deduct mortgage interest, you must itemize deductions on your tax return. Many Americans now take the standard deduction instead (about $13,850 for single filers in 2023), which is higher than their mortgage interest.

Example: If your mortgage interest is $8,000 per year but the standard deduction is $13,850, you don't benefit from itemizing. The mortgage deduction becomes worthless to you.

## Implications for Early Payoff
This is actually good news for early payoff strategies: since most homeowners can't benefit from the deduction anyway, there's less tax reason to carry your mortgage longer. You might as well save the interest!

## Strategic Considerations
- If you genuinely itemize deductions, paying less interest means smaller tax deductions
- Early payoff still provides better long-term financial security
- The guaranteed return (your interest rate) often beats uncertain tax savings

Our calculator focuses on the raw numbers, helping you see the true financial benefit of early payoff regardless of tax considerations.`,
      category: 'Education',
      readTime: 5,
      date: '2024-01-20',
      icon: '📊'
    },
    {
      id: 6,
      title: 'Refinancing Your Mortgage: When It Makes Sense',
      excerpt: 'Learn when refinancing is a smart move and how it can accelerate your path to becoming mortgage-free.',
      content: `Refinancing isn't just about getting a lower interest rate. Strategic refinancing can be a powerful tool for accelerating mortgage payoff while potentially saving money in the process.

## When Refinancing Makes Sense
Refinancing typically makes sense when:
- Interest rates have dropped significantly (usually at least 1% lower)
- You plan to stay in your home long enough to recoup closing costs
- You want to switch from adjustable-rate to fixed-rate mortgages
- You want to shorten your loan term (e.g., from 30 to 15 years)

## The Payoff Strategy: Shorter Terms
One powerful refinancing move is refinancing from a 30-year to a 15-year mortgage. Even if the interest rate is similar, you'll pay the loan off twice as fast and save massive amounts of interest.

Example: $300,000 at 6.5%
- 30-year mortgage: $1,896/month, ~$382,000 in interest
- 15-year mortgage: ~$2,330/month, ~$119,000 in interest
- You pay $434 more monthly but save $263,000 in interest!

## Break-Even Analysis
Refinancing costs typically range from 2-5% of the loan amount. If you're paying $10,000 in refinancing costs, you need to save at least $10,000 over the life of the loan for it to break even. Most people break even within 5-7 years.

## The No-Cost Refinance Option
Some lenders offer no-cost refinancing where they cover closing costs in exchange for a slightly higher interest rate. This is worth comparing since it eliminates upfront costs.

## Using Our Calculator
Our early payoff calculator can help you see the impact of refinancing strategies. Experiment with different interest rates and monthly payment amounts to find your optimal path to becoming mortgage-free.

The key decision: Is saving on interest worth the upfront cost and effort of refinancing?`,
      category: 'Strategy',
      readTime: 6,
      date: '2024-01-15',
      icon: '🔄'
    }
  ];

  selectedPost: BlogPost | null = null;
  selectedCategory: string = 'All';

  ngOnInit(): void {
    // Initialize component
  }

  get filteredPosts(): BlogPost[] {
    if (this.selectedCategory === 'All') {
      return this.blogPosts;
    }
    return this.blogPosts.filter(post => post.category === this.selectedCategory);
  }

  get categories(): string[] {
    const cats = ['All', ...new Set(this.blogPosts.map(post => post.category))];
    return cats;
  }

  selectPost(post: BlogPost): void {
    this.selectedPost = post;
    // Scroll to top of article
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  closePost(): void {
    this.selectedPost = null;
  }

  getFormattedDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
