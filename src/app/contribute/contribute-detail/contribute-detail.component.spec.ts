import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributeDetailComponent } from './contribute-detail.component';

describe('ContributeDetailComponent', () => {
  let component: ContributeDetailComponent;
  let fixture: ComponentFixture<ContributeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContributeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
