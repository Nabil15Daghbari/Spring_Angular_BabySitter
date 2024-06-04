package com.babysitting.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.babysitting.model.Admin;
import com.babysitting.service.AdminService;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("api/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class AdminController {

	private final AdminService adminService ; 
	
	@PostMapping("")
	public ResponseEntity<Admin> create(@RequestBody Admin dto){
		Admin response = adminService.create(dto);
		return new ResponseEntity<Admin>(response, HttpStatus.OK);
		
	}
}
