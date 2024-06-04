package com.babysitting.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.babysitting.model.Parent;
import com.babysitting.service.ParentService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/parent")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class ParentController {
	
	private final ParentService parentService ;
	
	@PostMapping("")  
	public ResponseEntity<Parent> create(@RequestBody Parent dto){
		Parent response = parentService.create(dto);
		return new ResponseEntity<Parent>(response, HttpStatus.OK);
		
	}

}
