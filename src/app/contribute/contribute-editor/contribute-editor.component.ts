import { TopicService } from './../../services/topic.service';
import { Observable } from 'rxjs';
import { TypeInfoComponent } from './../type-info/type-info.component';
import { SourceInfoComponent } from './../source-info/source-info.component';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, ValidatorFn, ValidationErrors } from '@angular/forms';
import { QuillEditorComponent } from 'ngx-quill';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-contribute-editor',
  templateUrl: './contribute-editor.component.html',
  styleUrls: ['./contribute-editor.component.sass']
})
export class ContributeEditorComponent implements OnInit {

  private urlRegex = /^[A-Za-z][A-Za-z\d.+-]*:\/*(?:\w+(?::\w+)?@)?[^\s/]+(?::\d+)?(?:\/[\w#!:.?+=&%@\-/]*)?$/;
  public sources: string[] = [];
  public topics$: Observable<string[]>;
  public wordcount = 0;

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
      topic: new FormControl(''),
      topicTitle: new FormControl(''),
      editor: new FormControl('', [Validators.required, Validators.minLength(20)]),
      sourceInput: new FormControl('', Validators.pattern(this.urlRegex))
    });

    this.topics$ = this.topicService.getTopicTitles();

    this.form.setValidators(this.formValidator());

  }


  ngOnInit(): void {

    // Keep track of wordcount
    this.editor.onContentChanged.subscribe(data => {
      this.wordcount = data.text.trim().length;
    });

  }

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

  checkURL(url: string) {
    return this.urlRegex.test(url);
  }

  // Add source to the list
  onAddSource() {

    this.onSubmit();

    const formRef = this.form.get('sourceInput');

    const source = formRef.value;

    const validURL = this.checkURL(source);

    if (validURL) {
      this.sources.push(source);
      formRef.reset();
    }

  }

  onRemoveSource(index: number) {
    this.sources.splice(index, 1);
  }


  formValidator(): ValidatorFn {


    return (group: FormGroup): ValidationErrors => {

      // Get formControls
      const type = group.get('type');
      const topicTitle = group.get('topicTitle');
      const topic = group.get('topic');
      const editor = group.get('editor');
      const source = group.get('sourceInput');


      // Set error if wordcount not between 20 and 1000
      if (this.wordcount < 20) {
        editor.setErrors({ textTooShort: true });
      } else if (this.wordcount > 1000) {
        editor.setErrors({ textTooLong: true });
      }

      // Check topic selection / title
      if (type.value === 'topic') {
        if (topicTitle.value === '') {
          topicTitle.setErrors({ titleMissing: true });
          topic.setErrors(null);
        }
      } else if (type.value === 'resource') {
        if (topic.value === '') {
          topic.setErrors({ topicMissing: true });
          topicTitle.setErrors(null);
        }
      }

      return;

    };

  }



  onSubmit() {
    console.log(this.form);
  }

}

