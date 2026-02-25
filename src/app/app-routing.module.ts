import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EarlyMortgagePayoffCalculatorComponent } from './early-mortgage-payoff-calculator/early-mortgage-payoff-calculator.component';
import { MortgagePayoffWithExtraPaymentsComponent } from './mortgage-payoff-with-extra-payments/mortgage-payoff-with-extra-payments.component';
import { MortgageCalculatorComponent } from './mortgage-calculator/mortgage-calculator.component';
import { RefinanceCalculatorComponent } from './refinance-calculator/refinance-calculator.component';
import { LegalComponent } from './legal/legal.component';
import { BlogResourcesComponent } from './blog-resources/blog-resources.component';
import { Payoff15YearsComponent } from './payoff-15-years/payoff-15-years.component';
import { BiweeklyVsMonthlyComponent } from './biweekly-vs-monthly/biweekly-vs-monthly.component';
import { RefinanceVsPayoffComponent } from './refinance-vs-payoff/refinance-vs-payoff.component';

const routes: Routes = [
  // SEO-optimized educational pages
  { path: 'payoff-15-years', component: Payoff15YearsComponent },
  { path: 'biweekly-vs-monthly', component: BiweeklyVsMonthlyComponent },
  { path: 'refinance-vs-payoff', component: RefinanceVsPayoffComponent },
  
  // Calculator components
  { path: 'early-mortgage-payoff-calculator', component: EarlyMortgagePayoffCalculatorComponent },
  { path: 'early-payoff-calculator', component: EarlyMortgagePayoffCalculatorComponent }, // Alternative path
  { path: 'mortgage-payoff-with-extra-payments', component: MortgagePayoffWithExtraPaymentsComponent },
  { path: 'extra-payment-calculator', component: MortgagePayoffWithExtraPaymentsComponent }, // Alternative path
  { path: 'mortgage-calculator', component: MortgageCalculatorComponent },
  { path: 'refinance-calculator', component: RefinanceCalculatorComponent },
  
  // Other pages
  { path: 'blog-resources', component: BlogResourcesComponent },
  { path: 'blog', component: BlogResourcesComponent }, // Alternative path
  { path: 'legal', component: LegalComponent },
  
  // Default route
  { path: '', redirectTo: '/early-mortgage-payoff-calculator', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
