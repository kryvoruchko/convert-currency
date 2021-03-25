import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConvertDashboardComponent } from './components/convert-dashboard/convert-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: ConvertDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConvertRoutingModule { }
