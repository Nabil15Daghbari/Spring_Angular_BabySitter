package com.babysitting.service;

import java.util.List;
import com.babysitting.model.avis;
import jakarta.validation.Valid;

public interface AvisService extends BaseService<avis, Integer> {

	avis create(@Valid avis dto, Integer parentId, Integer announcementId);

	List<avis> findByAnnouncementId(Integer announcementId); 


}
