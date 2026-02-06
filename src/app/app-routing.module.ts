import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EarlyMortgagePayoffCalculatorComponent } from './early-mortgage-payoff-calculator/early-mortgage-payoff-calculator.component';
import { MortgagePayoffWithExtraPaymentsComponent } from './mortgage-payoff-with-extra-payments/mortgage-payoff-with-extra-payments.component';
import { MortgageCalculatorComponent } from './mortgage-calculator/mortgage-calculator.component';
import { RefinanceCalculatorComponent } from './refinance-calculator/refinance-calculator.component';
import { LegalComponent } from './legal/legal.component';

const routes: Routes = [
  { path: 'early-mortgage-payoff-calculator', component: EarlyMortgagePayoffCalculatorComponent },
  { path: 'mortgage-payoff-with-extra-payments', component: MortgagePayoffWithExtraPaymentsComponent },
  { path: 'mortgage-calculator', component: MortgageCalculatorComponent },
  { path: 'refinance-calculator', component: RefinanceCalculatorComponent },
  { path: 'legal', component: LegalComponent },
  { path: '', redirectTo: '/early-mortgage-payoff-calculator', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
