package com.babysitting.service;

import com.babysitting.model.User;



public interface UserService extends BaseService<User, Integer>  {

	User accepterOrRefuserAccount(Integer idUser, int etat);
	String validateToken(String token);  
	void createPasswordResetTokenForUser(User user, String passwordToken);
    void saveUserVerificationToken(User theUser, String verificationToken);
	

	

}
