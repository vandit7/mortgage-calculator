import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-legal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.scss']
})
export class LegalComponent implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.setPageSeo({
      title: 'Legal — Privacy Policy, Terms of Service & Disclaimer',
      description: 'Privacy policy, terms of service, and financial disclaimer for Smart Mortgage Payoff calculators and tools.',
      url: '/legal',
    });
  }
}
