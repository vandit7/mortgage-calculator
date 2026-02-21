import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogResourcesComponent } from './blog-resources.component';

describe('BlogResourcesComponent', () => {
  let component: BlogResourcesComponent;
  let fixture: ComponentFixture<BlogResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogResourcesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlogResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display all blog posts initially', () => {
    expect(component.filteredPosts.length).toBe(component.blogPosts.length);
  });

  it('should filter posts by category', () => {
    component.selectedCategory = 'Strategy';
    expect(component.filteredPosts.length).toBeLessThan(component.blogPosts.length);
    expect(component.filteredPosts.every(post => post.category === 'Strategy')).toBeTruthy();
  });

  it('should select a blog post', () => {
    const post = component.blogPosts[0];
    component.selectPost(post);
    expect(component.selectedPost).toEqual(post);
  });

  it('should close the blog post', () => {
    component.selectedPost = component.blogPosts[0];
    component.closePost();
    expect(component.selectedPost).toBeNull();
  });

  it('should format date correctly', () => {
    const formattedDate = component.getFormattedDate('2024-02-10');
    expect(formattedDate).toContain('February');
    expect(formattedDate).toContain('10');
    expect(formattedDate).toContain('2024');
  });

  it('should have all categories available', () => {
    const categories = component.categories;
    expect(categories).toContain('All');
    expect(categories).toContain('Strategy');
    expect(categories).toContain('Planning');
    expect(categories).toContain('Education');
  });
});
