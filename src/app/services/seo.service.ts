import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private titleService = inject(Title);
  private metaService = inject(Meta);

  /**
   * Set page title and meta tags
   */
  setPageMeta(config: {
    title: string;
    description: string;
    url?: string;
    image?: string;
    type?: string;
  }): void {
    // Set title
    this.titleService.setTitle(config.title);

    // Set meta tags
    this.metaService.updateTag({
      name: 'description',
      content: config.description,
    });

    // Open Graph
    this.updateProperty('og:title', config.title);
    this.updateProperty('og:description', config.description);
    this.updateProperty('og:type', config.type || 'website');

    if (config.url) {
      this.updateProperty('og:url', config.url);
    }

    if (config.image) {
      this.updateProperty('og:image', config.image);
    }

    // Twitter Card
    this.updateTag({
      name: 'twitter:card',
      content: 'summary_large_image',
    });

    this.updateTag({
      name: 'twitter:title',
      content: config.title,
    });

    this.updateTag({
      name: 'twitter:description',
      content: config.description,
    });

    if (config.image) {
      this.updateTag({
        name: 'twitter:image',
        content: config.image,
      });
    }
  }

  /**
   * Set canonical URL
   */
  setCanonical(url: string): void {
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', url);
    } else {
      const link = document.createElement('link');
      link.rel = 'canonical';
      link.href = url;
      document.head.appendChild(link);
    }
  }

  /**
   * Add structured data (JSON-LD)
   */
  addStructuredData(data: any): void {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  }

  /**
   * Add Calculator Schema
   */
  addCalculatorSchema(name = 'Mortgage Payoff Calculator'): void {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name,
      url: window.location.href,
      applicationCategory: 'FinanceApplication',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        ratingCount: '24847',
      },
    };

    this.addStructuredData(schema);
  }

  /**
   * Add Organization Schema
   */
  addOrganizationSchema(data: {
    name: string;
    logo?: string;
    url?: string;
    email?: string;
  }): void {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: data.name,
      ...(data.url && { url: data.url }),
      ...(data.logo && { logo: data.logo }),
      ...(data.email && { contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Customer Support',
        email: data.email,
      }}),
    };

    this.addStructuredData(schema);
  }

  /**
   * Add FAQ Schema
   */
  addFaqSchema(faqs: Array<{ question: string; answer: string }>): void {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };

    this.addStructuredData(schema);
  }

  /**
   * Update meta tag by name
   */
  private updateTag(config: { name: string; content: string }): void {
    const existing = document.querySelector(`meta[name="${config.name}"]`);
    if (existing) {
      existing.setAttribute('content', config.content);
    } else {
      this.metaService.addTag(config);
    }
  }

  /**
   * Update Open Graph property
   */
  private updateProperty(property: string, content: string): void {
    const existing = document.querySelector(`meta[property="${property}"]`);
    if (existing) {
      existing.setAttribute('content', content);
    } else {
      this.metaService.addTag({
        property,
        content,
      });
    }
  }
}
