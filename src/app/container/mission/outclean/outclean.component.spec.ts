import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutcleanComponent } from './outclean.component';

describe('OutcleanComponent', () => {
  let component: OutcleanComponent;
  let fixture: ComponentFixture<OutcleanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutcleanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutcleanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
