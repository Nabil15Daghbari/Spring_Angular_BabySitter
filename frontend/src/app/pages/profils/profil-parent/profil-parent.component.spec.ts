import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilParentComponent } from './profil-parent.component';

describe('ProfilParentComponent', () => {
  let component: ProfilParentComponent;
  let fixture: ComponentFixture<ProfilParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilParentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
