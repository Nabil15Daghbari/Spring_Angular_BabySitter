package com.babysitting.utils;
 
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {
	
	 @Value("${spring.application.security.jwt.secret-Key}")
     private String secretKey;
	 @Value("${spring.application.security.jwt.expiration}")
	 private long jwtExpiration ;
	 @Value("${spring.application.security.jwt.refresh-token.expiration}")
	 private long refreshExpiration ;  
	
	
	
	
	
	public String extractUsername(String token) {
		return extractClaim(token , Claims::getSubject) ;
	}
	
	
	public <T> T extractClaim(String token , Function<Claims , T> claimsResolver) {
		final Claims claimes = extractAllClaimes(token);
		return claimsResolver.apply(claimes);
	}
	
	public String generateToken(UserDetails userDetails) {
		return generateToken(new HashMap<>() , userDetails);
	}
	
	// mecanisme pour genérer un token extratClaimes a partir de userDetails
	public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
		return buildToken(extraClaims, userDetails, jwtExpiration);
	}
	
	// mecanisme pour genérer le refresh token extratClaimes a partir de userDetails
	public String generateRefreshToken(UserDetails userDetails) {
		return buildToken(new HashMap<>() , userDetails, refreshExpiration);
	}
	
	
	private String buildToken(Map<String, Object> extraClaims, UserDetails userDetails , long expiration) {
		return Jwts
				.builder()
				.setClaims(extraClaims)
				.setSubject(userDetails.getUsername())
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + expiration))
				.signWith(getSignInKey() , SignatureAlgorithm.HS256)
				.compact();
	}
	
	public boolean isTokenValid(String token , UserDetails userDetails) {
		final String username = extractUsername(token);
		return (username.equals(userDetails.getUsername())) && !isTokenExprired(token);
	}
	
	private boolean isTokenExprired(String token) {
		return extractExpiration(token).before(new Date());
	}


	private Date extractExpiration(String token) {
		return extractClaim(token , Claims::getExpiration);
	}


	private Claims extractAllClaimes(String token) {
		  if (token == null || token.isEmpty() || !token.contains(".")) {
		        // Gérer le cas où la chaîne JWT est invalide ou vide
		        throw new IllegalArgumentException("Token JWT invalide ou vide");
		    }
		return Jwts
				.parserBuilder()
				.setSigningKey(getSignInKey())
				.build()
				.parseClaimsJws(token)
				.getBody();
	}
	
	private Key getSignInKey() {
		byte[] KeyBytes = Decoders.BASE64.decode(secretKey); 
		return Keys.hmacShaKeyFor(KeyBytes) ;
	}
	
	
	  
	
	
}
