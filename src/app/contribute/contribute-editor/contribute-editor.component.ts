import { ContributionService } from './../../services/contribution.service';
import { TopicService } from './../../services/topic.service';
import { Observable } from 'rxjs';
import { TypeInfoComponent } from './../type-info/type-info.component';
import { SourceInfoComponent } from './../source-info/source-info.component';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, ValidatorFn, ValidationErrors } from '@angular/forms';
import { QuillEditorComponent } from 'ngx-quill';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFireAuth } from '@angular/fire/auth';
import { Contribution } from 'src/models/contribution.model';
import { Location } from '@angular/common';
import { BackRoutingService } from './../../services/back-routing.service';
import { Router } from '@angular/router';

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
    private topicService: TopicService,
    public afAuth: AngularFireAuth,
    private contributionService: ContributionService,
    private router: Router,
    private brs: BackRoutingService,
    private location: Location
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

  onNavigateBack() {

    const previousUrl = this.brs.getPreviousUrl();

    if (previousUrl === undefined) {
      this.router.navigate(['/']);
    } else {
      this.location.back();
    }

  }

  handleEnter(event: Event) {
    return false;
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

    const inputRef = this.form.get('sourceInput');
    const source = inputRef.value;
    const validURL = this.checkURL(source);

    if (validURL) {
      this.sources.push(source);
      inputRef.reset();
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

  async onSubmit() {

    const type = this.form.get('type').value;
    let topic: string;

    if (type === 'topic') {
      topic = this.form.get('topicTitle').value;
    } else if (type === 'resource') {
      topic = this.form.get('topic').value;
    } else {
      return;
    }

    const content = this.form.get('editor').value;
    const sources = this.sources;

    const contribution: Contribution = {
      type,
      topic,
      content,
      sources
    };

    this.contributionService.createContribution(contribution)
      .then(res => {
        this.form.reset();
        this.sources = [];
      });

  }

}

