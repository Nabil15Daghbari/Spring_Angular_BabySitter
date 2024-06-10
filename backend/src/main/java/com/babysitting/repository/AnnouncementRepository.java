package com.babysitting.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.babysitting.model.Announcement;


@Repository
public interface AnnouncementRepository  extends JpaRepository<Announcement, Integer> {
	
    List<Announcement> findByRole(String role);
    List<Announcement> findByStatus(String status);
    List<Announcement> findByStatusAndRole(String status , String role); 
    
    // Requête pour récupérer les annonces selon l'ID du parent
    @Query("SELECT a FROM Announcement a WHERE a.parent.id = :parentId")
    List<Announcement> findByParentId(@Param("parentId") Integer parentId);
    
    // Requête pour récupérer les annonces selon l'ID du babysitter
    @Query("SELECT a FROM Announcement a WHERE a.babysitter.id = :babysitterId")
    List<Announcement> findByBabysitterId(@Param("babysitterId") Integer babysitterId);
    
    



}  
