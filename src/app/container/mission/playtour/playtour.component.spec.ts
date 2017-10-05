import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaytourComponent } from './playtour.component';

describe('PlaytourComponent', () => {
  let component: PlaytourComponent;
  let fixture: ComponentFixture<PlaytourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaytourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaytourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
