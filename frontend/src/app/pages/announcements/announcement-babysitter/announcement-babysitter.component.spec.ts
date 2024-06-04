import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementBabysitterComponent } from './announcement-babysitter.component';

describe('AnnouncementBabysitterComponent', () => {
  let component: AnnouncementBabysitterComponent;
  let fixture: ComponentFixture<AnnouncementBabysitterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementBabysitterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnouncementBabysitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
