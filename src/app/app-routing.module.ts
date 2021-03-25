import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'convert',
    pathMatch: 'full',
  },
  {
    path: 'convert',
    loadChildren: () => import('./convert/convert.module').then(m => m.ConvertModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
