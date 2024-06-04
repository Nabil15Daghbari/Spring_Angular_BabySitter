import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeAccepteComponent } from './demande-accepte.component';

describe('DemandeAccepteComponent', () => {
  let component: DemandeAccepteComponent;
  let fixture: ComponentFixture<DemandeAccepteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeAccepteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeAccepteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
