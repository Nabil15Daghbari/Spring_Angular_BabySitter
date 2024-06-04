package com.babysitting.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.babysitting.enm.Role;
import com.babysitting.model.User;
import java.util.List;

@Repository
public interface UserRepository  extends JpaRepository<User, Integer>{
	
	Optional<User> findByEmail(String email);
	Boolean existsByEmail(String email);
	List<User> findByRole(Role role);  
	

}
