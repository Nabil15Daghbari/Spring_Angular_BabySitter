package com.babysitting.service.Impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.babysitting.exception.NotFoundException;
import com.babysitting.model.Parent;
import com.babysitting.repository.ParentRepository;
import com.babysitting.service.ParentService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ParentServiceImpl implements ParentService{
	
	private final ParentRepository parentRepository ;

	@Override
	public Parent create(Parent dto) {
		return parentRepository.save(dto);
	}

	@Override
	public Parent update(Integer id, Parent dto) throws NotFoundException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Parent findById(Integer id) throws NotFoundException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Parent> findAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void delete(Integer id) throws NotFoundException {
		// TODO Auto-generated method stub
		
	}

}
