import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConvertDashboardComponent } from './components/convert-dashboard/convert-dashboard.component';
import { ConvertNavActionsComponent } from './components/convert-nav-actions/convert-nav-actions.component';
import { CurrenciesListComponent } from './components/currencies-list/currencies-list.component';
import { ConvertCurrenciesComponent } from './components/convert-currencies/convert-currencies.component';
import { ConvertRoutingModule } from './convert-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ConvertDashboardComponent,
    ConvertNavActionsComponent,
    CurrenciesListComponent,
    ConvertCurrenciesComponent,
  ],
  imports: [
    CommonModule,
    ConvertRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
  ],
})
export class ConvertModule { }
