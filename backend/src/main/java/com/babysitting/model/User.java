package com.babysitting.model;

import java.util.Collection;
import java.util.List;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import com.babysitting.enm.Role;
import com.babysitting.token.Token;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Builder 
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor 
@Entity
public class User implements UserDetails{
	
	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private Integer id ; 
	private String firstname ; 
	private String lastname ; 
	private String email ;
	private String password ; 
	private String sexe ;
	private String status;  
	
	@Enumerated(EnumType.STRING)
	private  Role   role ;
	
	
	@OneToMany(mappedBy = "user")
    @JsonIgnoreProperties("user")
	private List<Token> tokens ;
	
	@OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
	@JsonIgnoreProperties("user")
	private Parent parent ;
	
	@OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
	@JsonIgnoreProperties("user")
	private Babysitter babysitter ;
	
	
	
	
	
	@OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
	@JsonIgnoreProperties("user")
	private Admin admin;
	
	
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return null;
	}
	@Override   
	public String getUsername() {
		return email;
	}
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}
	@Override
	public boolean isAccountNonLocked() {
		return true;  
	}
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}
	@Override
	public boolean isEnabled() {
		return true;
	}
	@Override
	public String getPassword() {
		return password;
	}
	  
	
}
