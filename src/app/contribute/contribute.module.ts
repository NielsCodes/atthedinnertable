import { UrlPipe } from './../pipes/url.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContributeRoutingModule } from './contribute-routing.module';
import { ContributeComponent } from './contribute.component';
import { ContributeEditorComponent } from './contribute-editor/contribute-editor.component';
import { ContributeDetailComponent } from './contribute-detail/contribute-detail.component';
import { SourceInfoComponent } from './source-info/source-info.component';

import { QuillModule } from 'ngx-quill';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';

// Angular Material
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TypeInfoComponent } from './type-info/type-info.component';
import { MatSelectModule } from '@angular/material/select';

const quillConfig = {
  modules: {
    toolbar: [['bold', 'italic', 'underline']]
  },
  bounds: 'self',
  minLength: 20,
  maxLength: 1000
};

@NgModule({
  declarations: [
    ContributeComponent,
    ContributeEditorComponent,
    ContributeDetailComponent,
    SourceInfoComponent,
    TypeInfoComponent,
    UrlPipe
  ],
  imports: [
    QuillModule.forRoot(quillConfig),
    CommonModule,
    ContributeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule,
    MatRadioModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
    MatSelectModule
  ],
  entryComponents: []
})
export class ContributeModule { }
