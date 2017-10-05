import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinExhibitionComponent } from './join-exhibition.component';

describe('JoinExhibitionComponent', () => {
  let component: JoinExhibitionComponent;
  let fixture: ComponentFixture<JoinExhibitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinExhibitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinExhibitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
