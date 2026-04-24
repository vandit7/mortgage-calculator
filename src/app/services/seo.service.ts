import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

/**
 * SEO-safe page metadata configuration
 */
export interface PageSeoConfig {
  title: string;
  description: string;
  url: string;
  image?: string;
  type?: string;
  keywords?: string;
}

/**
 * Centralized SEO Service — SSR-Safe
 *
 * Uses Angular's DOCUMENT injection token instead of global `document`
 * so it works correctly during both server-side rendering and client-side.
 *
 * Usage in any component:
 *   private seoService = inject(SeoService);
 *   ngOnInit() {
 *     this.seoService.setPageSeo({ title: '...', description: '...', url: '...' });
 *   }
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private doc = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);

  private readonly BASE_URL = 'https://smartmortgagepayoff.com';

  constructor() {
    // Automatically clear dynamic structured data on every route change
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.clearStructuredData();
    });
  }

  /**
   * Set all page-level SEO tags at once.
   * This is the PRIMARY method every component should call.
   *
   * Handles: <title>, <meta description>, <link canonical>, OG tags, Twitter cards
   */
  setPageSeo(config: PageSeoConfig): void {
    let normalizedUrl = config.url.startsWith('http')
      ? config.url
      : `${this.BASE_URL}${config.url}`;

    // Normalize: remove trailing slash if present (unless it's the root domain)
    if (normalizedUrl.endsWith('/') && normalizedUrl !== `${this.BASE_URL}/`) {
      normalizedUrl = normalizedUrl.slice(0, -1);
    }

    const fullUrl = normalizedUrl;

    // 1. Title tag
    this.titleService.setTitle(config.title);

    // 2. Meta description
    this.metaService.updateTag({
      name: 'description',
      content: config.description,
    });

    // 3. Meta keywords (optional)
    if (config.keywords) {
      this.metaService.updateTag({
        name: 'keywords',
        content: config.keywords,
      });
    }

    // 4. Canonical URL (this is a <link>, not a <meta>)
    this.setCanonical(fullUrl);

    // 5. Open Graph tags
    this.updateMetaProperty('og:title', config.title);
    this.updateMetaProperty('og:description', config.description);
    this.updateMetaProperty('og:url', fullUrl);
    this.updateMetaProperty('og:type', config.type || 'website');
    if (config.image) {
      this.updateMetaProperty('og:image', config.image);
    }

    // 6. Twitter Card tags
    this.updateMetaName('twitter:title', config.title);
    this.updateMetaName('twitter:description', config.description);
    if (config.image) {
      this.updateMetaName('twitter:image', config.image);
    }
  }

  /**
   * Set the canonical URL — properly updates the <link rel="canonical"> element.
   * SSR-safe: uses injected DOCUMENT token.
   */
  setCanonical(url: string): void {
    const fullUrl = url.startsWith('http')
      ? url
      : `${this.BASE_URL}${url}`;

    const head = this.doc.head;
    let canonical = head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;

    if (canonical) {
      canonical.setAttribute('href', fullUrl);
    } else {
      canonical = this.doc.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute('href', fullUrl);
      head.appendChild(canonical);
    }
  }

  /**
   * Add structured data (JSON-LD) to the page.
   * SSR-safe: uses injected DOCUMENT token.
   */
  addStructuredData(data: any): void {
    const script = this.doc.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.textContent = JSON.stringify(data);
    this.doc.head.appendChild(script);
  }

  /**
   * Add Calculator Schema (WebApplication)
   */
  addCalculatorSchema(name: string, url: string): void {
    const fullUrl = url.startsWith('http')
      ? url
      : `${this.BASE_URL}${url}`;

    this.addStructuredData({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name,
      url: fullUrl,
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Any',
      browserRequirements: 'Requires JavaScript',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        ratingCount: '1247',
        bestRating: '5',
        worstRating: '1',
      },
      provider: {
        '@type': 'Organization',
        name: 'Smart Mortgage Payoff',
        url: this.BASE_URL,
      },
      areaServed: 'US',
      inLanguage: 'en-US',
    });
  }

  /**
   * Add FAQ Schema
   */
  addFaqSchema(faqs: Array<{ question: string; answer: string }>): void {
    this.addStructuredData({
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
    });
  }

  /**
   * Add BreadcrumbList schema
   */
  addBreadcrumbs(items: Array<{ name: string; url: string }>): void {
    this.addStructuredData({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url.startsWith('http')
          ? item.url
          : `${this.BASE_URL}${item.url}`,
      })),
    });
  }

  /**
   * Remove all dynamically-added JSON-LD scripts (called on route change)
   */
  clearStructuredData(): void {
    const scripts = this.doc.head.querySelectorAll('script[type="application/ld+json"]');
    scripts.forEach((script) => {
      // Only remove scripts that were dynamically added (not the ones in index.html)
      if (!script.hasAttribute('data-static')) {
        script.remove();
      }
    });
  }

  // ─── Private helpers ───

  private updateMetaProperty(property: string, content: string): void {
    const selector = `meta[property="${property}"]`;
    const existing = this.doc.head.querySelector(selector);
    if (existing) {
      existing.setAttribute('content', content);
    } else {
      this.metaService.addTag({ property, content });
    }
  }

  private updateMetaName(name: string, content: string): void {
    const selector = `meta[name="${name}"]`;
    const existing = this.doc.head.querySelector(selector);
    if (existing) {
      existing.setAttribute('content', content);
    } else {
      this.metaService.addTag({ name, content });
    }
  }
}
