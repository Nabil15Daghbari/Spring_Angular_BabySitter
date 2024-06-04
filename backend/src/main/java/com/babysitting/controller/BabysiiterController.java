package com.babysitting.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.babysitting.model.Admin;
import com.babysitting.model.Babysitter;
import com.babysitting.service.AdminService;
import com.babysitting.service.BabysitterService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/babysitter")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class BabysiiterController {
	
	private final BabysitterService babysitterService ; 

	
	@PostMapping("")  
	public ResponseEntity<Babysitter> create(@RequestBody Babysitter dto){
		Babysitter response = babysitterService.create(dto);
		return new ResponseEntity<Babysitter>(response, HttpStatus.OK);
		
	}
}
