package com.babysitting.controller.auth;
import com.babysitting.enm.Role;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor 
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class AuthenticationResponse {

	    private String accessToken;
	    private String refreshToken;
	    private Integer id;
	    private String firstname;
	    private String lastname;
	    private String email;
	    private Role role;
	    private String sexe ;
		


	
}
