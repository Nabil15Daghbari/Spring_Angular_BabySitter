package com.babysitting.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.babysitting.model.Request;


@Repository
public interface RequestRespository  extends JpaRepository<Request, Integer>{
   
     List<Request> findByBabysitterId(@Param("babysitterId") Integer babysitterId);  
     
     @Query("SELECT r FROM Request r JOIN r.announcement a WHERE a.parent.id = :parentId")
     List<Request> findRequestsByParentId(@Param("parentId") Integer parentId);
     
	 List<Request> findByStatus(@Param("status") String status); 

    
}
