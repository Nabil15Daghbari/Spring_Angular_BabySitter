package com.babysitting.service.Impl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.babysitting.exception.NotFoundException;
import com.babysitting.model.Announcement;
import com.babysitting.model.Parent;
import com.babysitting.model.avis;
import com.babysitting.repository.AnnouncementRepository;
import com.babysitting.repository.AvisRepository;
import com.babysitting.repository.ParentRepository;
import com.babysitting.service.AvisService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AvisServiceImpl  implements AvisService{
	
	private final AvisRepository avisRepository ; 
	private final AnnouncementRepository announcementRepository ; 
	private final ParentRepository parentRepository ;
	
	
	@Override
	public avis create(avis dto) {
		// TODO Auto-generated method stub
		return null;
	}
	
	@Override
	public avis create(@Valid avis dto, Integer parentId, Integer announcementId) {
		Parent parent = parentRepository.findById(parentId).orElseThrow();
		Announcement announcement = announcementRepository.findById(announcementId).orElseThrow();
		dto.setParent(parent);
		dto.setAnnouncement(announcement);
		dto.setDate(LocalDate.now() );
		return avisRepository.save(dto);
	} 
	@Override
	public avis update(Integer id, avis dto) throws NotFoundException {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public avis findById(Integer id) throws NotFoundException {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public List<avis> findAll() {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public void delete(Integer id) throws NotFoundException {
		// TODO Auto-generated method stub
		
	}
  
	@Override
	public List<avis> findByAnnouncementId(Integer announcementId) {
		
		return avisRepository.findByAnnouncementId(announcementId);
	}
	

}
