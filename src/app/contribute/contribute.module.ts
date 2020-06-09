import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContributeRoutingModule } from './contribute-routing.module';
import { ContributeComponent } from './contribute.component';
import { ContributeEditorComponent } from './contribute-editor/contribute-editor.component';
import { ContributeDetailComponent } from './contribute-detail/contribute-detail.component';


@NgModule({
  declarations: [ContributeComponent, ContributeEditorComponent, ContributeDetailComponent],
  imports: [
    CommonModule,
    ContributeRoutingModule
  ]
})
export class ContributeModule { }
