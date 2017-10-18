import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterduceComponent } from './interduce.component';

describe('InterduceComponent', () => {
  let component: InterduceComponent;
  let fixture: ComponentFixture<InterduceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterduceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterduceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
