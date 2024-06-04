package com.babysitting.controller;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.babysitting.exception.NotFoundException;
import com.babysitting.model.Announcement;
import com.babysitting.service.AnnouncementService;
import jakarta.validation.Valid;  
import lombok.RequiredArgsConstructor;



@RestController
@RequestMapping("api/announcement")
@RequiredArgsConstructor
public class AnnouncementController {
	
	private final AnnouncementService service ;
	

	@PostMapping("")
	public ResponseEntity<Announcement> create(
			@RequestBody @Valid Announcement dto ,
			@RequestParam(required = false) Integer parentId ,
			@RequestParam(required = false) Integer babysiiterId  ){
		Announcement response = service.create(dto , parentId , babysiiterId);
		return new  ResponseEntity<>(response , HttpStatus.CREATED);
	}  
	
	
	@PutMapping("/{id}")
	public ResponseEntity<Announcement> update(@PathVariable Integer id , @RequestBody Announcement dto ) throws NotFoundException {
		Announcement response = service.update(id, dto);
		return new ResponseEntity<>(response , HttpStatus.OK);
	}
	
	@GetMapping("")
	public ResponseEntity<List<Announcement>> findAll(){
		List<Announcement> response = service.findAll();
	    return new ResponseEntity<>(response , HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Announcement> findById(@PathVariable Integer id ) throws NotFoundException {
		Announcement response = service.findById(id);
		return new ResponseEntity<>(response , HttpStatus.OK);		
	}
	
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> delete(@PathVariable Integer id) throws NotFoundException {
		service.delete(id);
		return new ResponseEntity<>(true, HttpStatus.OK); 
	}
	
	@GetMapping("/findAnnouncementByRole")
	public ResponseEntity<List<Announcement>> findAllByRole( @RequestParam String role){
		List<Announcement> response = service.findAllByRole(role);
	    return new ResponseEntity<>(response , HttpStatus.OK);
	}
	
	@GetMapping("/findByStatus")
	public ResponseEntity<List<Announcement>> findAllBy( @RequestParam String status){
		List<Announcement> response = service.findAllByStatus(status);
	    return new ResponseEntity<>(response , HttpStatus.OK);
	}
	
	 @PutMapping("/updateStatusDemande/{announcementId}")
	 public ResponseEntity<Announcement> updateStatus(@PathVariable Integer announcementId , @RequestBody StatusDTO statusDTO ){
		 Announcement response = service.updateStatus(announcementId , statusDTO.getStatus());
		 return new ResponseEntity<Announcement>(response , HttpStatus.OK);
	 }
	 
	 
	   @GetMapping("/findByStatusAndRole")
		public ResponseEntity<List<Announcement>> findByStatusAndRole( @RequestParam String status ,  @RequestParam String role){
		   System.out.println(status + role);
			List<Announcement> response = service.findByStatusAndRole(status , role);
		    return new ResponseEntity<>(response , HttpStatus.OK);
		}

}
