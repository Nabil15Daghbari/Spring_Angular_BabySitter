package com.babysitting.token;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TokenRepository  extends JpaRepository<Token, Integer>{
	// c'est une methode qui permet de recuréruer la liste de token a condition que id de token.user.id = u.id et telque l'espriration de token est false et aussi le revoque est false 
	
	@Query("SELECT t FROM Token t INNER JOIN t.user u WHERE u.id = :userId AND (t.expired = false OR t.revoked = false)")
	List<Token> findAllValidTokensByUser(@Param("userId") Integer userId);
	
	Optional<Token> findByToken(String token);

}
