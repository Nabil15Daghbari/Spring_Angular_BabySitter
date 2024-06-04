package com.babysitting.model;

import java.time.LocalDate;
import java.util.Set;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Request {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id ;
    private LocalDate  dateCreation;  
    private String nom;
    private String prenom ; 
    private String cin ; 
    private String adresse ; 
    private String status ;
    
      
      @ManyToMany(fetch=FetchType.EAGER , cascade=CascadeType.ALL) 
	   @JoinTable(name="demande_document",
	  
	  			joinColumns= {
	  					
	  					@JoinColumn(name="demande_id")
	  			}, 
	  			inverseJoinColumns= {
	  					@JoinColumn(name="document_id")  
	  			}
	  
			  )
	    private Set<ImageModel> document ;
    
    @JsonIgnore 
    @ManyToOne  
	@JoinColumn(name = "babysitter_id")
	private Babysitter babysitter;  
    
    
    @ManyToOne  
	@JoinColumn(name = "announcement_id")
	private Announcement announcement;   
    
    
 
    
    
    
}



