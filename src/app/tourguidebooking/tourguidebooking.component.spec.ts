import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourguidebookingComponent } from './tourguidebooking.component';

describe('TourguidebookingComponent', () => {
  let component: TourguidebookingComponent;
  let fixture: ComponentFixture<TourguidebookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourguidebookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourguidebookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
