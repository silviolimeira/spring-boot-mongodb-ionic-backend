package com.example.demo.domain;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.example.demo.domain.enums.Perfil;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonValue;

@Document //(collection="user")
public class User implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	private String id;
	
	private String name;
	private String email;
	
	//@JsonIgnore
	private String password;
	
	@DBRef(lazy = true)
	private Set<Post> posts = new HashSet<>();

	private Set<Perfil> perfis = new HashSet<>();
	
	public User() {
		addPerfil(Perfil.CLIENTE);
	}
	
	public User(String id, String name, String email, String password) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
		addPerfil(Perfil.CLIENTE);
	}
	
//	public Set<Integer> getPerfis() {
//		return perfis.stream().map(x -> Perfil.toEnum(x)).collect(Collectors.toSet());
//	}
//
//	public void setPerfis(Set<Perfil> perfis) {
//		this.perfis = perfis;
//	}

	public void addPerfil(Perfil perfil) {
		perfis.add(perfil);
	}
	

	public Set<Perfil> getPerfis() {
		return perfis;
	}

	public void setPerfis(Set<Perfil> perfis) {
		this.perfis = perfis;
	}

	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Set<Post> getPosts() {
		return posts;
	}
	
	public void setPosts(Set<Post> posts) {
		this.posts = posts;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		User other = (User) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
	
}
