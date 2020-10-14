package com.example.demo.services;

import org.springframework.mail.SimpleMailMessage;

import com.example.demo.domain.User;

public interface EmailService {

	//void sendOrderConfirmationEmail(Pedido obj);
	
	void sendEmail(SimpleMailMessage msg);
	
	void sendNewPasswordEmail(User user, String newPass);
	
}
