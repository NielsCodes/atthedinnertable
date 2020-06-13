import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContributeRoutingModule } from './contribute-routing.module';
import { ContributeComponent } from './contribute.component';
import { ContributeEditorComponent } from './contribute-editor/contribute-editor.component';
import { ContributeDetailComponent } from './contribute-detail/contribute-detail.component';

import { QuillModule } from 'ngx-quill';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';

// Angular Material
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [ContributeComponent, ContributeEditorComponent, ContributeDetailComponent],
  imports: [
    CommonModule,
    ContributeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule,
    MatRadioModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule
  ]
})
export class ContributeModule { }
