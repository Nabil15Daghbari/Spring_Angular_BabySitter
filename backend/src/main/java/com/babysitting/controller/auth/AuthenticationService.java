package com.babysitting.controller.auth;


import java.io.IOException;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.babysitting.model.Admin;
import com.babysitting.model.Babysitter;
import com.babysitting.model.Parent;
import com.babysitting.model.User;
import com.babysitting.repository.AdminRepository;
import com.babysitting.repository.BabysitterRepository;
import com.babysitting.repository.ParentRepository;
import com.babysitting.repository.UserRepository;
import com.babysitting.token.Token;
import com.babysitting.token.TokenRepository;
import com.babysitting.token.TokenType;
import com.babysitting.utils.JwtService;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class AuthenticationService {
	
	private final UserRepository repository ; 
	private final PasswordEncoder passwordEncoder ;
	private final JwtService jwtService ;
	private final AuthenticationManager authenticationManager ;
	private final TokenRepository tokenRepository ;
	private final AdminRepository adminRepository ;
	private final ParentRepository parentRepository ;
	private final BabysitterRepository babysitterRepository ;
	
	
	
	public AuthenticationResponse authenticate(AuthenticationRequest request ) {
		 authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(
						request.getEmail(),
						request.getPassword()
						)
				);
		 var user = repository.findByEmail(request.getEmail())
				 .orElseThrow(); 		
		 var jwtToken = jwtService.generateToken(user);
         var refreshToken = jwtService.generateRefreshToken(user);
		 revokedAllUserTokens(user);
		 saveUserToken(user, jwtToken);
		 return AuthenticationResponse.builder()
					.accessToken(jwtToken)
					.refreshToken(refreshToken)	
					.id(user.getId())
		            .firstname(user.getFirstname())
		            .lastname(user.getLastname())
		            .email(user.getEmail())
		            .role(user.getRole())
		            .sexe(user.getSexe())
					.build();
							
	}
	
	
	
	
	
	
	
	public static String jwtGenerated;
	
	public AuthenticationResponse register(RegisterRequest request) {
		var user = User.builder()
				.firstname(request.getFirstname())
				.lastname(request.getLastname())
				.email(request.getEmail())
				.password(passwordEncoder.encode(request.getPassword()))
				.role(request.getRole())
				.sexe(request.getSexe())
				.status(request.getStatus())
				.build();  
		
       
         
		

		var savedUSer= repository.save(user);
		var jwtToken = jwtService.generateToken(user);
		jwtGenerated =jwtToken ;
		var refreshToken = jwtService.generateRefreshToken(user);
		saveUserToken(savedUSer, jwtToken);
		saveUserWithRole(user);
		return AuthenticationResponse.builder()
				.accessToken(jwtToken)
				.refreshToken(refreshToken)
				.id(savedUSer.getId())
	            .firstname(savedUSer.getFirstname())
	            .lastname(savedUSer.getLastname())
	            .email(savedUSer.getEmail())
	            .role(savedUSer.getRole())
	            .sexe(savedUSer.getSexe())
				.build();
	}
	
	
	
	private void revokedAllUserTokens(User user) {
		var validUserTokens =tokenRepository.findAllValidTokensByUser(user.getId());
		if(validUserTokens.isEmpty()) {
			return ;
		}
		
		validUserTokens.forEach(t -> {
			t.setExpired(true);
			t.setRevoked(true);
			
		});
		tokenRepository.saveAll(validUserTokens);
	}
	private void saveUserWithRole(User user) {
	    switch (user.getRole().toString()) {
	        case "ADMINISTRATEUR":
	        	saveUserAdmin(user);
	            break; 
	        case "Parent":
	        	saveUserParent(user);
	            break;
	        case "Babysitter":
	        	saveUserbabysitter(user);
	            break;       
	       
	        default:
	            // Gestion par défaut si le rôle n'est pas reconnu
	            throw new IllegalArgumentException("Rôle non pris en charge : " + user.getRole().toString());
	    }
	}
	
	private void saveUserAdmin(User user) {
	    var admin = Admin.builder()
	            .user(user)
	            .build();
	     adminRepository.save(admin);
	   }
	
	private void saveUserParent(User user) {
	    var parent = Parent.builder()
	            .user(user)
	            .build();
	     parentRepository.save(parent);
	   }
	
	private void saveUserbabysitter(User user) {
	    var babysitter = Babysitter.builder()
	            .user(user)
	            .build();
	    babysitterRepository.save(babysitter);
	   }
	
	private void saveUserToken(User user, String jwtToken) {
		var token =Token.builder()
				.user(user)
				.token(jwtToken)
				.tokenType(TokenType.BEARER)
				.expired(false)
				.revoked(false)
				.build();
		tokenRepository.save(token);
	}
	
	
	public void refreshToken(
			HttpServletRequest request, 
			HttpServletResponse response
	 ) throws IOException{
		
		final String authHeader =request.getHeader(HttpHeaders.AUTHORIZATION);
		final String refreshToken;
		final String userEmail; 
		if(authHeader == null || !authHeader.startsWith("Bearer ") ) {
			return;
		}
		refreshToken=authHeader.substring(7);
		userEmail=jwtService.extractUsername(refreshToken);
		
		 if(userEmail != null ) {
			var user =this.repository.findByEmail(userEmail)
					.orElseThrow();
			if (jwtService.isTokenValid(refreshToken, user)) {
				var accessToken = jwtService.generateToken(user);
				 revokedAllUserTokens(user);
				 saveUserToken(user, accessToken);
				var authResponse = AuthenticationResponse.builder()
						 .accessToken(accessToken)
						 .refreshToken(refreshToken)
						 .build();
			new ObjectMapper().writeValue(response.getOutputStream(), authResponse);			
				
			}
		}
	}
	
	

}
