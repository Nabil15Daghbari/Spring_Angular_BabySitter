package com.babysitting.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.babysitting.model.avis;

@Repository
public interface AvisRepository extends JpaRepository<avis, Integer> {
	
	List<avis> findByAnnouncementId(@Param("announcementId") Integer announcementId);
	
	

}
