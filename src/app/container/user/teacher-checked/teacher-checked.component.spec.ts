import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherCheckedComponent } from './teacher-checked.component';

describe('TeacherCheckedComponent', () => {
  let component: TeacherCheckedComponent;
  let fixture: ComponentFixture<TeacherCheckedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherCheckedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherCheckedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
