package com.babysitting.service;

import java.util.List;

import com.babysitting.model.Enfant;

import jakarta.validation.Valid;

public interface EnfantService extends BaseService<Enfant, Integer> {

	Enfant create(@Valid Enfant dto, Integer parentId);

	List<Enfant> findEnfantByParentId(Integer parentId);   
      
}
