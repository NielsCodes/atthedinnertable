import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { QuillEditorComponent } from 'ngx-quill';

@Component({
  selector: 'app-contribute-editor',
  templateUrl: './contribute-editor.component.html',
  styleUrls: ['./contribute-editor.component.sass']
})
export class ContributeEditorComponent implements OnInit {

  form: FormGroup;
  @ViewChild('editor', {
    static: true
  }) editor: QuillEditorComponent;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      type: new FormControl('topic', Validators.required),
      editor: new FormControl('Hello world', [Validators.required, Validators.minLength(20)]),
      sources: new FormArray([
        new FormControl('', Validators.required)
      ])
    });
  }

  ngOnInit(): void {

    this.editor.onContentChanged.subscribe(d => console.log(d));

  }

  onSubmit() {
    console.log('Form submitted');
  }

}
