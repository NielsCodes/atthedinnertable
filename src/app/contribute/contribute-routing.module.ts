import { ContributeDetailComponent } from './contribute-detail/contribute-detail.component';
import { ContributeEditorComponent } from './contribute-editor/contribute-editor.component';
import { ContributeComponent } from './contribute.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: ContributeComponent, children: [
    { path: 'edit', component: ContributeEditorComponent },
    { path: ':id', component: ContributeDetailComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContributeRoutingModule { }
