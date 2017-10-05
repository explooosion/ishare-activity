import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourplayComponent } from './tourplay.component';

describe('TourplayComponent', () => {
  let component: TourplayComponent;
  let fixture: ComponentFixture<TourplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
