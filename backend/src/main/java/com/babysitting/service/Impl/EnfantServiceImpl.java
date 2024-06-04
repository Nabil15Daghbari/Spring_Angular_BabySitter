package com.babysitting.service.Impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import com.babysitting.exception.NotFoundException;
import com.babysitting.model.Enfant;
import com.babysitting.model.Parent;
import com.babysitting.repository.EnfantRepository;
import com.babysitting.repository.ParentRepository;
import com.babysitting.service.EnfantService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EnfantServiceImpl implements EnfantService {
	private final EnfantRepository enfantRepository ; 
	private final ParentRepository parentRepository ;
	
	@Override
	public Enfant create(Enfant dto) {
		return enfantRepository.save(dto);
	}
	
	@Override
	public Enfant create(@Valid Enfant dto, Integer parentId) {
		Parent parent = parentRepository.findById(parentId)
				.orElseThrow();
		dto.setParent(parent);
		
		return  enfantRepository.save(dto);
	}


	@Override
	public Enfant update(Integer id, Enfant dto) throws NotFoundException {
		Enfant enfant = enfantRepository.findById(id)
				.orElseThrow();
		enfant.setNom(dto.getNom());
		enfant.setPrenom(dto.getPrenom());
		enfant.setAge(dto.getAge());
		enfant.setCategory(dto.getCategory());
		enfant.setSexe(dto.getSexe()); 
		return enfantRepository.save(enfant);
	}

	@Override
	public Enfant findById(Integer id) throws NotFoundException {
		Optional<Enfant> optional = this.enfantRepository.findById(id);
		return optional.get();
	}

	@Override
	public List<Enfant> findAll() {
		return enfantRepository.findAll();
	}

	@Override
	public void delete(Integer id) throws NotFoundException {
		enfantRepository.deleteById(id);	
	}

	@Override
	public List<Enfant> findEnfantByParentId(Integer parentId) {
		return enfantRepository.findByParentId(parentId);
	}

	
}
