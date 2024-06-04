package com.babysitting.controller;

import java.io.IOException;
import java.util.List;
import java.util.Set;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.babysitting.exception.NotFoundException;
import com.babysitting.model.ImageModel;
import com.babysitting.model.Request;
import com.babysitting.service.RequestService;
import com.babysitting.service.Impl.ImageModelServiceImpl;
import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("api/demande")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class RequestController {
 
			private final RequestService requestService ; 
			private final ImageModelServiceImpl imageService ;
			
	 @PostMapping("")
	 public ResponseEntity<Request> create(
			 @RequestPart("demande") Request Request , 
			 @RequestParam("babysitterId") Integer babysitterId , 
			 @RequestParam("announcementId") Integer announcementId , 
			 @RequestPart("imageFile") MultipartFile[] file
			 )throws IOException{
		 Set<ImageModel> images = imageService.uploadImage(file);
		 Request.setDocument(images);
		 Request response = requestService.creats(Request, babysitterId, announcementId);
		 return new ResponseEntity<Request>(response , HttpStatus.CREATED);
	 }  
	 

     @GetMapping("/{demandeid}")
	 public ResponseEntity<Request> findById(@PathVariable Integer demandeid)  throws NotFoundException {
		Request response = requestService.findById(demandeid);
		return new ResponseEntity<>(response , HttpStatus.OK);
	 }

	 @GetMapping("/getByBabysitter/{babysitterId}")
	 public ResponseEntity<List<Request>> findByCandidat(@PathVariable Integer babysitterId ) {
		 List<Request> response = this.requestService.findByBabysitterId(babysitterId) ;   
		   return new ResponseEntity<List<Request>>(response , HttpStatus.OK) ;
	 }
	 
	 @GetMapping("")
	 public ResponseEntity<List<Request>> findAll(){
		List<Request> response = requestService.findAll(); 
		return new ResponseEntity<List<Request>>(response , HttpStatus.OK);
				
	 }
	 
	 
	  @GetMapping("/requests/by-parent")
	    public ResponseEntity<List<Request>> getRequestsByParentId(@RequestParam Integer parentId) {
	        List<Request> requests = requestService.getRequestsByParentId(parentId);
	        return ResponseEntity.ok(requests);
	    }
	 

	  @PutMapping("/updateStatusDemande/{demandeId}")
		 public ResponseEntity<Request> updateStatus(@PathVariable Integer demandeId , @RequestBody StatusDTO statusDTO ){
		  Request response = requestService.updateStatus(demandeId , statusDTO.getStatus());
			 return new ResponseEntity<Request>(response , HttpStatus.OK);
		 }
	 
	
	  
		 @GetMapping("/findAllByStatus")
		 public ResponseEntity<List<Request>> findAllByStatus(){
			 List<Request> responseDemandeDtos = requestService.findByStatus();
			 return new ResponseEntity<List<Request>>(responseDemandeDtos , HttpStatus.OK);
		 }
	
	 

	  
}
