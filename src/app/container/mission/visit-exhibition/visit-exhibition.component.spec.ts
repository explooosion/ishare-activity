import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitExhibitionComponent } from './visit-exhibition.component';

describe('VisitExhibitionComponent', () => {
  let component: VisitExhibitionComponent;
  let fixture: ComponentFixture<VisitExhibitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitExhibitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitExhibitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
