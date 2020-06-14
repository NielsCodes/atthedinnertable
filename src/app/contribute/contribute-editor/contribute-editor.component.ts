import { TopicService } from './../../services/topic.service';
import { Observable } from 'rxjs';
import { TypeInfoComponent } from './../type-info/type-info.component';
import { SourceInfoComponent } from './../source-info/source-info.component';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { QuillEditorComponent } from 'ngx-quill';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-contribute-editor',
  templateUrl: './contribute-editor.component.html',
  styleUrls: ['./contribute-editor.component.sass']
})
export class ContributeEditorComponent implements OnInit {

  private urlRegexp = /^[A-Za-z][A-Za-z\d.+-]*:\/*(?:\w+(?::\w+)?@)?[^\s/]+(?::\d+)?(?:\/[\w#!:.?+=&%@\-/]*)?$/;
  private sources: string[] = [];
  public topics$: Observable<string[]>;

  form: FormGroup;
  @ViewChild('editor', {
    static: true
  }) editor: QuillEditorComponent;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private topicService: TopicService
  ) {

    // Create form
    this.form = fb.group({
      type: new FormControl('resource', Validators.required),
      editor: new FormControl('Hello world', [Validators.required, Validators.minLength(20)]),
      sourceInput: new FormControl('', Validators.pattern(this.urlRegexp))
    });

    this.topics$ = this.topicService.getTopicTitles();
    this.topics$.subscribe(topics => console.log(topics));

  }


  ngOnInit(): void { }

  // Show source info dialog
  openSourceDialog() {
    this.dialog.open(SourceInfoComponent, {
      width: '400px'
    });
  }

  // Show type info dialog
  openTypeDialog() {
    this.dialog.open(TypeInfoComponent, {
      width: '400px'
    });
  }

  // Add source to the list
  onAddSource() {

    const formRef = this.form.get('sourceInput');

    const source = formRef.value;
    this.sources.push(source);
    formRef.reset();
    console.log(source);

  }

  onSubmit() {
    console.log('Form submitted');
  }

}

