import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandePArentComponent } from './demande-parent.component';

describe('DemandePArentComponent', () => {
  let component: DemandePArentComponent;
  let fixture: ComponentFixture<DemandePArentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandePArentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandePArentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
