package com.babysitting.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.babysitting.model.Enfant;

@Repository
public interface EnfantRepository extends JpaRepository<Enfant, Integer> {
	List<Enfant> findByParentId(Integer parentId);
    
}
