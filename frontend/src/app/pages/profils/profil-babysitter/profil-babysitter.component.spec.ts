import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilBabysitterComponent } from './profil-babysitter.component';

describe('ProfilBabysitterComponent', () => {
  let component: ProfilBabysitterComponent;
  let fixture: ComponentFixture<ProfilBabysitterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilBabysitterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilBabysitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
