import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsitestatsComponent } from './websitestats.component';

describe('WebsitestatsComponent', () => {
  let component: WebsitestatsComponent;
  let fixture: ComponentFixture<WebsitestatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsitestatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsitestatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
