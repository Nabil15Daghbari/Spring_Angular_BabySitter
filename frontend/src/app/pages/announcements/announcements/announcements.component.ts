import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../service/announcement.service';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss']
})
export class AnnouncementsComponent implements OnInit {

  constructor(
    private announcementService: AnnouncementService,

  ) { }

  ngOnInit(): void {
  }

 

}
