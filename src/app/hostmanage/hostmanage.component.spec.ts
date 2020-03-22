import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostmanageComponent } from './hostmanage.component';

describe('HostmanageComponent', () => {
  let component: HostmanageComponent;
  let fixture: ComponentFixture<HostmanageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostmanageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostmanageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
