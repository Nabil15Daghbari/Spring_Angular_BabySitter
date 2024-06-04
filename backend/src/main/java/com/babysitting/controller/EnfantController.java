package com.babysitting.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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
import com.babysitting.model.Enfant;
import com.babysitting.service.EnfantService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/enfant")
@RequiredArgsConstructor
public class EnfantController {
	
	private final EnfantService enfantservice ; 

	@PostMapping("")
	public ResponseEntity<Enfant> create(@RequestBody @Valid Enfant dto ,  @RequestParam("parentId") Integer parentId) {
		Enfant response = enfantservice.create(dto , parentId);
		return new  ResponseEntity<>(response , HttpStatus.CREATED);
	}  
	
	
	@PutMapping("/{id}")
	public ResponseEntity<Enfant> update(@PathVariable Integer id , @RequestBody Enfant dto ) throws NotFoundException {
		Enfant response = enfantservice.update(id, dto);
		return new ResponseEntity<>(response , HttpStatus.OK);
	}
	
	@GetMapping("")
	public ResponseEntity<List<Enfant>> findAll(){
		List<Enfant> response = enfantservice.findAll();
	    return new ResponseEntity<>(response , HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Enfant> findById(@PathVariable Integer id ) throws NotFoundException {
		Enfant response = enfantservice.findById(id);
		return new ResponseEntity<>(response , HttpStatus.OK);		
	}
	
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> delete(@PathVariable Integer id) throws NotFoundException {
		enfantservice.delete(id);
		return new ResponseEntity<>(true, HttpStatus.OK); 
	}
	
	

	@GetMapping("/getEnfnatByParentId/{parentId}")
	public ResponseEntity<List<Enfant>> getRendeVousBychefId(@PathVariable Integer parentId  ){
		List<Enfant> rendezVousDtos =enfantservice.findEnfantByParentId(parentId);
		return ResponseEntity.ok(rendezVousDtos) ;
	}
	


	
	 
	 


}
