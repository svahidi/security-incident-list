import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'admin', pathMatch: 'full'},
  { path: 'admin',
    loadChildren: () =>
      import('src/app/modules/admin-console/admin-console.module').then((m) => m.AdminConsoleModule),
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
