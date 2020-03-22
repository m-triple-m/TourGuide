import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostprofileComponent } from './hostprofile.component';

describe('HostprofileComponent', () => {
  let component: HostprofileComponent;
  let fixture: ComponentFixture<HostprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
