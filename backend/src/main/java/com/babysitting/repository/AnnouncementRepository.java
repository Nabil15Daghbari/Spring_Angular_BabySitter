package com.babysitting.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.babysitting.model.Announcement;


@Repository
public interface AnnouncementRepository  extends JpaRepository<Announcement, Integer> {
	
    List<Announcement> findByRole(String role);
    List<Announcement> findByStatus(String status);
    List<Announcement> findByStatusAndRole(String status , String role); 
    
    



}  
