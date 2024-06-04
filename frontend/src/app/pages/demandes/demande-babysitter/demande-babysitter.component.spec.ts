import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeBabysitterComponent } from './demande-babysitter.component';

describe('DemandeBabysitterComponent', () => {
  let component: DemandeBabysitterComponent;
  let fixture: ComponentFixture<DemandeBabysitterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeBabysitterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeBabysitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
