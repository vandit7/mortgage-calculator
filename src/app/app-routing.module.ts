import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EarlyMortgagePayoffCalculatorComponent } from './early-mortgage-payoff-calculator/early-mortgage-payoff-calculator.component';

const routes: Routes = [
  { path: 'early-mortgage-payoff-calculator', component: EarlyMortgagePayoffCalculatorComponent },
  { path: '', redirectTo: '/early-mortgage-payoff-calculator', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
