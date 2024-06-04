package com.babysitting.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.babysitting.model.ImageModel;


public interface ImageModelRepository extends JpaRepository<ImageModel, Integer> {

    ImageModel findByUserId(String userId);

}
