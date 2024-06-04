package com.babysitting.service.Impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.babysitting.exception.NotFoundException;
import com.babysitting.model.Babysitter;
import com.babysitting.repository.BabysitterRepository;
import com.babysitting.service.BabysitterService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BabysitterServiceImpl implements BabysitterService {
	
	private final BabysitterRepository babysitterRepository ;
	
	@Override
	public Babysitter create(Babysitter dto) {
		// TODO Auto-generated method stub
		return babysitterRepository.save(dto);
	}

	@Override
	public Babysitter update(Integer id, Babysitter dto) throws NotFoundException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Babysitter findById(Integer id) throws NotFoundException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Babysitter> findAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void delete(Integer id) throws NotFoundException {
		// TODO Auto-generated method stub
		
	}

}
