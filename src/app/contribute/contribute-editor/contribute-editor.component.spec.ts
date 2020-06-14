import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributeEditorComponent } from './contribute-editor.component';

describe('ContributeEditorComponent', () => {
  let component: ContributeEditorComponent;
  let fixture: ComponentFixture<ContributeEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContributeEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
