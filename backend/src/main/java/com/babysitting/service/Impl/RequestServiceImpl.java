package com.babysitting.service.Impl;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

import com.babysitting.exception.NotFoundException;
import com.babysitting.model.Announcement;
import com.babysitting.model.Babysitter;
import com.babysitting.model.Request;
import com.babysitting.repository.AnnouncementRepository;
import com.babysitting.repository.BabysitterRepository;
import com.babysitting.service.RequestService;
import com.babysitting.repository.RequestRespository;
import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class RequestServiceImpl implements RequestService {
	
	private final RequestRespository RequestRespository ; 
	private final AnnouncementRepository announcementRepository ;
	private final BabysitterRepository babysitterRepository ; 
	
	
	
	@Override
	public Request create(Request dto) {
		// TODO Auto-generated method stub
		return null;
	}
	
	
	@Override
	public Request creats(Request dto, Integer babySitterId, Integer announcementId) {		
		Announcement announcement =announcementRepository.findById(announcementId)
				.orElseThrow(() -> new RuntimeException("announcement non trouvé avec l'ID : " + announcementId));
		Babysitter intern = babysitterRepository.findById(babySitterId)
				.orElseThrow(() -> new RuntimeException("candidacy non trouvé avec l'ID : " + babySitterId));
		dto.setAnnouncement(announcement);
		dto.setBabysitter(intern);
		dto.setDateCreation(LocalDate.now()); 
		return RequestRespository.save(dto);
	}
	
	@Override
	public Request update(Integer id, Request dto)  {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public Request findById(Integer id) throws NotFoundException {
		Request entity = RequestRespository.findById(id)
				.orElseThrow(() -> new RuntimeException("demande not found"));
		return entity ;
	}
	@Override
	public List<Request> findAll() {
		return RequestRespository.findAll();
				
	}
	
	@Override
	public void delete(Integer id) throws NotFoundException {
		// TODO Auto-generated method stub
		
	}


	@Override
	public List<Request> findByBabysitterId(Integer babysitterId) {
		
		return this.RequestRespository.findByBabysitterId(babysitterId);
	}


	 public List<Request> getRequestsByParentId(Integer parentId) {
	        return RequestRespository.findRequestsByParentId(parentId);
	    }


	@Override
	public Request updateStatus(Integer demandeId, String status) {
		Request request = RequestRespository.findById(demandeId)
				.orElseThrow(() -> new RuntimeException("demande not found"));
		request.setStatus(status);
		return RequestRespository.save(request);
				
	}


	@Override
	public List<Request> findByStatus() {
		
		return RequestRespository.findByStatus("Accepté"); 
	}



	










	
	
	

}
