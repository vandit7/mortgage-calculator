import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [

  // SEO educational pages
  {
    path: 'payoff-15-years',
    loadComponent: () =>
      import('./payoff-15-years/payoff-15-years.component')
        .then(m => m.Payoff15YearsComponent)
  },
  {
    path: 'biweekly-vs-monthly',
    loadComponent: () =>
      import('./biweekly-vs-monthly/biweekly-vs-monthly.component')
        .then(m => m.BiweeklyVsMonthlyComponent)
  },
  {
    path: 'refinance-vs-payoff',
    loadComponent: () =>
      import('./refinance-vs-payoff/refinance-vs-payoff.component')
        .then(m => m.RefinanceVsPayoffComponent)
  },

  // Calculators
  {
    path: 'early-mortgage-payoff-calculator',
    loadComponent: () =>
      import('./early-mortgage-payoff-calculator/early-mortgage-payoff-calculator.component')
        .then(m => m.EarlyMortgagePayoffCalculatorComponent)
  },
  {
    path: 'early-payoff-calculator',
    loadComponent: () =>
      import('./early-mortgage-payoff-calculator/early-mortgage-payoff-calculator.component')
        .then(m => m.EarlyMortgagePayoffCalculatorComponent)
  },
  {
    path: 'mortgage-payoff-with-extra-payments',
    loadComponent: () =>
      import('./mortgage-payoff-with-extra-payments/mortgage-payoff-with-extra-payments.component')
        .then(m => m.MortgagePayoffWithExtraPaymentsComponent)
  },
  {
    path: 'extra-payment-calculator',
    loadComponent: () =>
      import('./mortgage-payoff-with-extra-payments/mortgage-payoff-with-extra-payments.component')
        .then(m => m.MortgagePayoffWithExtraPaymentsComponent)
  },
  {
    path: 'mortgage-calculator',
    loadComponent: () =>
      import('./mortgage-calculator/mortgage-calculator.component')
        .then(m => m.MortgageCalculatorComponent)
  },
  {
    path: 'refinance-calculator',
    loadComponent: () =>
      import('./refinance-calculator/refinance-calculator.component')
        .then(m => m.RefinanceCalculatorComponent)
  },

  // Blog
  {
    path: 'blog-resources',
    loadComponent: () =>
      import('./blog-resources/blog-resources.component')
        .then(m => m.BlogResourcesComponent)
  },
  {
    path: 'blog',
    loadComponent: () =>
      import('./blog-resources/blog-resources.component')
        .then(m => m.BlogResourcesComponent)
  },

  // Legal
  {
    path: 'legal',
    loadComponent: () =>
      import('./legal/legal.component')
        .then(m => m.LegalComponent)
  },

  { path: '', redirectTo: '/early-mortgage-payoff-calculator', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
