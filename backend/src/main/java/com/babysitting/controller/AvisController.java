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
import com.babysitting.model.avis;
import com.babysitting.service.AvisService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/avis")
@RequiredArgsConstructor
public class AvisController {
	
	private final  AvisService service ;
	
	@PostMapping("")
	public ResponseEntity<avis> create(
			@RequestBody @Valid avis dto ,
			@RequestParam(required = false) Integer parentId ,
			@RequestParam(required = false) Integer announcementId  ){
		avis response = service.create(dto , parentId , announcementId);
		return new  ResponseEntity<>(response , HttpStatus.CREATED);
	}  
	
	 
	@PutMapping("/{id}")
	public ResponseEntity<avis> update(@PathVariable Integer id , @RequestBody avis dto ) throws NotFoundException {
		avis response = service.update(id, dto);
		return new ResponseEntity<>(response , HttpStatus.OK);
	}
	
	@GetMapping("")
	public ResponseEntity<List<avis>> findAll(){
		List<avis> response = service.findAll();
	    return new ResponseEntity<>(response , HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<avis> findById(@PathVariable Integer id ) throws NotFoundException {
		avis response = service.findById(id);
		return new ResponseEntity<>(response , HttpStatus.OK);		
	}
	
	@GetMapping("/getByAnnouncement")
	public ResponseEntity<?> findByAnnouncementId(@RequestParam  Integer announcementId ) throws NotFoundException {
		List<avis> response = service.findByAnnouncementId(announcementId);
		return new ResponseEntity<>(response , HttpStatus.OK);		
	}
	
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> delete(@PathVariable Integer id) throws NotFoundException {
		service.delete(id);
		return new ResponseEntity<>(true, HttpStatus.OK); 
	}
	
	
	
	 
	 

}
