import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffreParentComponent } from './offre-parent.component';

describe('OffreParentComponent', () => {
  let component: OffreParentComponent;
  let fixture: ComponentFixture<OffreParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffreParentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OffreParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
