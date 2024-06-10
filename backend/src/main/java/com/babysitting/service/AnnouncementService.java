package com.babysitting.service;

import java.util.List;

import com.babysitting.model.Announcement;

import jakarta.validation.Valid;


public interface AnnouncementService extends BaseService<Announcement, Integer> {

	List<Announcement> findAllByRole(String role);

	List<Announcement> findAllByStatus(String status);

	Announcement updateStatus(Integer announcementId, String status);

	List<Announcement> findByStatusAndRole(String status, String role);

	Announcement create(@Valid Announcement dto, Integer parentId, Integer babysiiterId);

	List<Announcement> getAnnouncementsByBabysitterId(Integer babysitterId);

	List<Announcement> getAnnouncementsByParentId(Integer parentId);         

}
