package com.babysitting.controller;

import java.security.Principal;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.babysitting.enm.Role;
import com.babysitting.exception.MessageResponse;
import com.babysitting.exception.NotFoundException;
import com.babysitting.model.ChangePasswordRequest;
import com.babysitting.model.User;
import com.babysitting.service.UserService;
import com.babysitting.service.Impl.UserServieImpl;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("api/user")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class UserController {

	
	private final UserService userService;
    private final UserServieImpl userServieImpl ;

	@PostMapping("")
	public ResponseEntity<User> create(@RequestBody @Valid User user) {
		User response = userService.create(user);  
		return new ResponseEntity<>(response, HttpStatus.CREATED);
	}

	

	@PutMapping("/{id}")
	public ResponseEntity<User> update(@PathVariable Integer id, @RequestBody User user)
			throws NotFoundException {
		User response = userService.update(id, user);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<User> findById(@PathVariable Integer id) throws NotFoundException {
		User response = userService.findById(id);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@GetMapping("")
	public ResponseEntity<List<User>> findAll() {
		List<User> response = userService.findAll();
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	

	@DeleteMapping("/{id}")
	public ResponseEntity<String> delete(@PathVariable Integer id) throws NotFoundException {
		userService.delete(id);
		return new ResponseEntity<>("user supprimé avec succes", HttpStatus.OK);
	}

	
	@PatchMapping("/change-password") 
	public  ResponseEntity<String> changePassword( @RequestBody ChangePasswordRequest request ,  Principal connectedUser){
		userService.changePassword(request ,connectedUser );
		return ResponseEntity.ok().build(); 
	}
	
	
	@PutMapping(value = "/accepterOrRefuser/{user_id}/{etat}")
	public ResponseEntity<MessageResponse> accepterOrRefuserConge( @PathVariable("user_id") Integer user_id, @PathVariable("etat") int etat) {
		userService.accepterOrRefuserAccount(user_id, etat);
		if (etat == 1 ) {
			return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse("compte accepté"));
		}
		else {
			return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse("compte refusè "));
		}

	}  
	
	
	@GetMapping("/get/{role}")
	public ResponseEntity<List<User>> getUserByRole(@PathVariable Role role) throws NotFoundException {
		List<User> userByRoles = this.userServieImpl.findByRole(role);
		 if(userByRoles.isEmpty())
			 throw new NotFoundException("La liste de user est vide ");
		 return new ResponseEntity<>(userByRoles, HttpStatus.OK);			
		
	}
	
	
	    
	
	
}
