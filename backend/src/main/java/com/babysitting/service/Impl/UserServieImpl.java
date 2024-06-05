package com.babysitting.service.Impl;

import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.babysitting.enm.Role;
import com.babysitting.exception.NotFoundException;
import com.babysitting.model.ChangePasswordRequest;
import com.babysitting.model.User;
import com.babysitting.repository.UserRepository;
import com.babysitting.service.UserService;
import com.babysitting.token.Token;
import com.babysitting.token.TokenRepository;

import lombok.RequiredArgsConstructor;



@Service
@RequiredArgsConstructor

public class UserServieImpl implements UserService{
	
	@Autowired 
	private UserRepository userRepository; 
	
    private final PasswordEncoder passwordEncoder;
    
    private final TokenRepository tokenRepository ;
   
    	
	private User save(User entity) {
		User existingUser=userRepository.findById(entity.getId()).orElse(null);

		return userRepository.save(entity);
	}
	
	
	@Override
	public User create(User dto) {
		return userRepository.save(dto);  
	}
	

	@Override
	public User update(Integer id, User dto) throws NotFoundException {
		Optional<User> optional = userRepository.findById(id);
		
				
		return null;
	}

	@Override
	public User findById(Integer id) throws NotFoundException {
		Optional<User> optional = userRepository.findById(id);
		if(optional.isEmpty()) {
			throw new NotFoundException("user not found");
		}	
		return optional.get();
	}

	@Override
	public List<User> findAll() {
		return userRepository.findAll()
				.stream()
				
				.collect(Collectors.toList());
	}

	 public List<User> findByRole(Role role) throws NotFoundException {	 
		 
		 List<User> users = userRepository.findByRole(role)
	        		.stream()
	        		.collect(Collectors.toList());
		 if(users.isEmpty()) {
			 throw new NotFoundException("users not find by role");
			 
		 }
	        return users ;
	    }

	 
	@Override
	public void delete(Integer id) throws NotFoundException {
		if(!userRepository.existsById(id)) {
			throw new NotFoundException("USer not found");
		}
		
		userRepository.deleteById(id);
	}

	 public User accepterOrRefuserAccount(Integer idUser, int etat) {
	        User user = userRepository.findById(idUser).get();
	        if (etat == 1)
	            user.setStatus("Accept");
	        else
	            user.setStatus("Refuse");
	        return userRepository.save(user);
	    }

	@Override
	public void saveUserVerificationToken(User theUser, String token) {
		 var verificationToken = new Token(token, theUser);
	        tokenRepository.save(verificationToken); 		
	}


	
	

	@Override
	public String validateToken(String theToken) {
		Optional<Token> optionToken=tokenRepository.findByToken(theToken);
		
		if(optionToken.isPresent()) {
			Token token = optionToken.get();
			
			if(token.isExpired() && token.isRevoked()) {
				return "Votre jeton a expiré ou a été révoqué."; 
			}
			User  user =token.getUser();
			userRepository.save(user);
			return "valid"; 
		}else {
			return "Token spécifié n'existe pas."; 
		}
		
		
	}

	@Override
	public void createPasswordResetTokenForUser(User user, String passwordToken) {
		// TODO Auto-generated method stub
		
	}

	


	 @Override
	 public void changePassword(ChangePasswordRequest request, Principal connectedUser) {

        var user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

        // check if the current password is correct
        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new IllegalStateException("Wrong password");
        }
        // check if the two new passwords are the same
        if (!request.getNewPassword().equals(request.getConfirmationPassword())) {
            throw new IllegalStateException("Password are not the same");
        }

        // update the password
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));

        // save the new password
        userRepository.save(user);
    }		

 
 

	 
	
}
