import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminConsoleRoutingModule } from './admin-console-routing.module';
import { SecurityIncidentsComponent } from './components/security-incidents/security-incidents.component';
import {FormsModule} from '@angular/forms';
import {ToolsModule} from '../../tools/tools.module';
import {MatDividerModule} from '@angular/material/divider';
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
  declarations: [
    SecurityIncidentsComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ToolsModule,
    AdminConsoleRoutingModule,
    MatDividerModule,
    MatTooltipModule
  ]
})
export class AdminConsoleModule { }
