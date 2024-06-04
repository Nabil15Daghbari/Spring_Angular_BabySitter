package com.babysitting.model;

import java.time.LocalDate;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter 
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Announcement {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private int nombreEnfant;
    private String typeService;
    private LocalDate date;  
    private String heureDebut;
    private String heureFin; 
    private String adresse;
    private String role ;
    private String status ; 
    
    
    @ManyToOne
    private Parent parent ;
    
    @ManyToOne
    private Babysitter babysitter ;
    
    
}
