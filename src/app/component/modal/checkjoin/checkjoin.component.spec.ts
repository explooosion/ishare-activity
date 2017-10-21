import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckjoinComponent } from './checkjoin.component';

describe('CheckjoinComponent', () => {
  let component: CheckjoinComponent;
  let fixture: ComponentFixture<CheckjoinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckjoinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckjoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
