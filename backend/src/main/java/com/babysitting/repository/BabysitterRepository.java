package com.babysitting.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.babysitting.model.Babysitter;

@Repository
public interface BabysitterRepository  extends JpaRepository<Babysitter, Integer>{

}
