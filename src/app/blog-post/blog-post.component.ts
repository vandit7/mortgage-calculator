import { ActivatedRoute, RouterModule } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { SeoService } from '../services/seo.service';
import { blogPosts } from '../blog-resources/blog-resources.component';
import { CommonModule } from '@angular/common';

interface ContentBlock {
  type: 'h2' | 'h3' | 'p' | 'list' | 'olist';
  text: string;
}

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.scss',
})
export class BlogPostComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private seoService = inject(SeoService);

  article: any;
  contentBlocks: ContentBlock[] = [];
  formattedDate = '';

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.article = blogPosts.find((a: any) => a.link === `/${slug}`);

    if (this.article) {
      this.contentBlocks = this.parseContent(this.article.content);
      this.formattedDate = new Date(this.article.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      this.seoService.setPageSeo({
        title: this.article.title,
        description: this.article.excerpt,
        url: `/blog/${slug}`,
        keywords: `${this.article.category}, mortgage payoff, ${this.article.title.toLowerCase()}`,
      });
    }
  }

  /** Parse plain-text content into typed blocks for safe template rendering. */
  private parseContent(raw: string): ContentBlock[] {
    return raw
      .split(/\n\n+/)
      .map(block => block.trim())
      .filter(block => block.length > 0)
      .map(block => {
        if (block.startsWith('### ')) {
          return { type: 'h3', text: block.slice(4).trim() };
        }
        if (block.startsWith('## ')) {
          return { type: 'h2', text: block.slice(3).trim() };
        }
        if (/^\d+\.\s/.test(block)) {
          return { type: 'olist', text: block.replace(/^\d+\.\s*/, '').trim() };
        }
        if (block.startsWith('- ') || block.startsWith('* ')) {
          return { type: 'list', text: block.slice(2).trim() };
        }
        return { type: 'p', text: block };
      });
  }
}