import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementParentComponent } from './announcement-parent.component';

describe('AnnouncementParentComponent', () => {
  let component: AnnouncementParentComponent;
  let fixture: ComponentFixture<AnnouncementParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementParentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnouncementParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
