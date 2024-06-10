package com.babysitting.service.Impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import com.babysitting.exception.NotFoundException;
import com.babysitting.model.Announcement;
import com.babysitting.model.Babysitter;
import com.babysitting.model.Parent;
import com.babysitting.repository.AnnouncementRepository;
import com.babysitting.repository.BabysitterRepository;
import com.babysitting.repository.ParentRepository;
import com.babysitting.service.AnnouncementService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;


@Service
@AllArgsConstructor
public class AnnouncementServiceImpl  implements  AnnouncementService {

	private AnnouncementRepository announcementRepository ;
	private ParentRepository parentRepository ;
	private BabysitterRepository babysitterRepository ;

	
	
	
	@Override
	public Announcement create(Announcement dto) {
		return  this.announcementRepository.save(dto);
	}
	
	@Override
	public Announcement create(@Valid Announcement dto, Integer parentId, Integer babysiiterId) {
		if(parentId != null) {
			Parent parent = parentRepository.findById(parentId).orElseThrow();
			dto.setParent(parent);
		}
		if(babysiiterId != null) {
			Babysitter babysitter = babysitterRepository.findById(babysiiterId).orElseThrow();
			dto.setBabysitter(babysitter);
		}
		
		return this.announcementRepository.save(dto);  
	} 

	@Override
	public Announcement update(Integer id, Announcement dto) throws NotFoundException {
		Announcement announcement = this.announcementRepository.findById(id)
				.orElseThrow();
		announcement.setNombreEnfant(dto.getNombreEnfant());
		announcement.setTypeService(dto.getTypeService());
		announcement.setDate(dto.getDate());
		announcement.setAdresse(dto.getAdresse());
		announcement.setHeureDebut(dto.getHeureDebut());
		announcement.setHeureFin(dto.getHeureFin());
		announcement.setStatus(dto.getStatus());   
		announcement.setName(dto.getName());
		announcement.setTel(dto.getTel());
		  
		return announcementRepository.save(announcement); 
	}

	@Override
	public Announcement findById(Integer id) throws NotFoundException {
		Optional<Announcement>  announcement =  this.announcementRepository.findById(id);
		return announcement.get();
	}

	@Override
	public List<Announcement> findAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void delete(Integer id) throws NotFoundException {
		announcementRepository.deleteById(id);	
		
	}

	@Override
	public List<Announcement> findAllByRole(String role) {
		
		return this.announcementRepository.findByRole(role);
	}

	@Override
	public List<Announcement> findAllByStatus(String status) {
		return this.announcementRepository.findByStatus(status);
	}

	@Override
	public Announcement updateStatus(Integer announcementId, String status) {
		Announcement request = announcementRepository.findById(announcementId)
				.orElseThrow(() -> new RuntimeException("announcementId not found"));
		request.setStatus(status);
		return announcementRepository.save(request);
				  
	}

	@Override
	public List<Announcement> findByStatusAndRole(String status, String role) {
		return this.announcementRepository.findByStatusAndRole(status , role);
	}

	@Override
	public List<Announcement> getAnnouncementsByBabysitterId(Integer babysitterId) {
		return announcementRepository.findByBabysitterId(babysitterId);

	}

	@Override
	public List<Announcement> getAnnouncementsByParentId(Integer parentId) {
		return announcementRepository.findByParentId(parentId);
	}

	
	
	
	
	
	
	
}
