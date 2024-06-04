package com.babysitting.service;

import java.util.List;

import com.babysitting.model.Request;



public interface RequestService extends BaseService<Request, Integer> {

	Request creats(Request dto , Integer babysitterId , Integer announcementId);

	List<Request> findByBabysitterId(Integer babysitterId);

	List<Request> getRequestsByParentId(Integer parentId);

	Request updateStatus(Integer demandeId, String status);

	List<Request> findByStatus();   

}
