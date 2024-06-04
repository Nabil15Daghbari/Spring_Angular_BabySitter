import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffreBabysitterComponent } from './offre-babysitter.component';

describe('OffreBabysitterComponent', () => {
  let component: OffreBabysitterComponent;
  let fixture: ComponentFixture<OffreBabysitterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffreBabysitterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OffreBabysitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
