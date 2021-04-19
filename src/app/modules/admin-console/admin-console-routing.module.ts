import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SecurityIncidentsComponent} from './components/security-incidents/security-incidents.component';

const routes: Routes = [
  {path: '', redirectTo: 'security-incident', pathMatch: 'full'},
  {path: 'security-incident', component: SecurityIncidentsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminConsoleRoutingModule { }
