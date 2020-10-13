package com.example.demo.services;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.domain.Post;
import com.example.demo.repository.PostRepository;
import com.example.demo.services.exception.ObjectNotFoundException;

@Service
public class PostService {

	@Autowired
	private PostRepository repo; 
	
	public Post findById(String id) {
		Optional<Post> post = repo.findById(id);
		return post.orElseThrow(() -> new ObjectNotFoundException("Objecto não encontrado"));
	}
	
	public List<Post> findByTitle(String text) {
		//return repo.findByTitleContainingIgnoreCase(text);
		//System.out.println("findByTitle: " + text);
		return repo.searchTitle(text);
	}
	
	//
	public List<Post> fullSearch(String text, Date minDate, Date maxDate) {
		//return repo.findByTitleContainingIgnoreCase(text);
		
		Date dt = new Date();
		Calendar c = Calendar.getInstance();
		c.setTime(dt); 
		c.add(Calendar.DATE, 1);
		dt = c.getTime();
		maxDate = dt;
		
		//maxDate = new Date(maxDate.getTime() + 24 * 60 * 60 * 1000);
		
		return repo.fullSearch(text, minDate, maxDate);
	}

}
