import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourguideComponent } from './tourguide.component';

describe('TourguideComponent', () => {
  let component: TourguideComponent;
  let fixture: ComponentFixture<TourguideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourguideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourguideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
