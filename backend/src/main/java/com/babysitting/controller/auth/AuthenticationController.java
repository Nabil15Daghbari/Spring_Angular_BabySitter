package com.babysitting.controller.auth;

import java.util.Optional;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.babysitting.exception.MessageResponse;
import com.babysitting.model.User;
import com.babysitting.repository.UserRepository;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class AuthenticationController {
	
	private final AuthenticationService service;
	private final UserRepository userRepository ;

	
	 @PostMapping("/register")
	  public ResponseEntity<Object> register(@RequestBody RegisterRequest registrationRequest) {
		
		 // il faut ajouter un condition if qui retuen un message kima emailexiste pour verifier l'activation de compte par email 
		 
		 if (userRepository.existsByEmail(registrationRequest.getEmail())) {
				return ResponseEntity
						.badRequest()
						.body(new MessageResponse("Erreur : l'email d'utilisateur est déjà utilisé !!!"));
			}
		 
		 var response = service.register(registrationRequest);
		
		 return ResponseEntity.ok(response)  ; 
	  }
	         
	 
	  @PostMapping("/authenticate")
	  public ResponseEntity<Object> authenticate( @RequestBody AuthenticationRequest request ) {
		  Optional<User> optionalUser  = userRepository.findByEmail(request.getEmail());
		  if (optionalUser.isPresent()) {
		        User user = optionalUser.get();	   
		        if ("0".equals(user.getStatus())) {
		            return ResponseEntity
		                    .badRequest()
		                    .body(new MessageResponse("Le compte n'est déjà plus valide par le service d'inscription!"));
		        }
		       
		        if ("refusè".equals(user.getStatus())) {
		            return ResponseEntity
		                    .badRequest()
		                    .body(new MessageResponse("Le compte a été refusée !!"));
		        }
 
		        return ResponseEntity.ok(service.authenticate(request));
		    } else {  
		        return ResponseEntity
		                .badRequest()
		                .body(new MessageResponse("Utilisateur non trouvé !"));  
		    }
	  }
	  
	 
	
	
}
