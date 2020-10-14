package com.example.demo.resources.exception;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.example.demo.services.exception.AuthorizationException;
import com.example.demo.services.exception.DataIntegrityException;
import com.example.demo.services.exception.ObjectNotFoundException;

@ControllerAdvice
public class ResourceExceptionHandler {

	@ExceptionHandler(ObjectNotFoundException.class)
	public ResponseEntity<?> objectNotFound(ObjectNotFoundException e, HttpServletRequest request) {
		HttpStatus status = HttpStatus.NOT_FOUND;
		StandardError err = new StandardError(System.currentTimeMillis(), status.value(), "Não encontrado",
				e.getMessage(), request.getRequestURI());
//		HttpHeaders headers = new HttpHeaders();
//		headers.add("Content-Type", "application/json; charset=utf-8");	
//		return ResponseEntity.status(status).headers(headers).body(err);
		return ResponseEntity.status(status).body(err);
	}

	@ExceptionHandler(AuthorizationException.class)
	public ResponseEntity<?> authorization(AuthorizationException e, HttpServletRequest request) {

		StandardError err = new StandardError(System.currentTimeMillis(), HttpStatus.FORBIDDEN.value(), "Acesso negado",
				e.getMessage(), request.getRequestURI());
		return ResponseEntity.status(HttpStatus.FORBIDDEN).body(err);
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<StandardError> validation(MethodArgumentNotValidException e, HttpServletRequest request) {

		ValidationError err = new ValidationError(System.currentTimeMillis(), HttpStatus.UNPROCESSABLE_ENTITY.value(),
				"Erro de validação", e.getMessage(), request.getRequestURI());
		for (FieldError x : e.getBindingResult().getFieldErrors()) {
			err.addError(x.getField(), x.getDefaultMessage());
		}
		return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(err);
	}

	@ExceptionHandler(DataIntegrityException.class)
	public ResponseEntity<StandardError> dataIntegrity(DataIntegrityException e, HttpServletRequest request) {
		StandardError err = new StandardError(System.currentTimeMillis(), HttpStatus.FORBIDDEN.value(),
				"Integridade de Dados", e.getMessage(), request.getRequestURI());
		return ResponseEntity.status(HttpStatus.FORBIDDEN).body(err);

	}

//	@ExceptionHandler(FileException.class)
//	public ResponseEntity<StandardError> file(FileException e, HttpServletRequest request) {
//		
//		StandardError err = new StandardError(System.currentTimeMillis(), HttpStatus.BAD_REQUEST.value(), "Erro de arquivo", e.getMessage(), request.getRequestURI());
//		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(err);
//	}
//
//	@ExceptionHandler(AmazonServiceException.class)
//	public ResponseEntity<StandardError> amazonService(AmazonServiceException e, HttpServletRequest request) {
//		
//		HttpStatus code = HttpStatus.valueOf(e.getErrorCode());
//		StandardError err = new StandardError(System.currentTimeMillis(), code.value(), "Erro Amazon Service", e.getMessage(), request.getRequestURI());
//		return ResponseEntity.status(code).body(err);
//	}
//
//	@ExceptionHandler(AmazonClientException.class)
//	public ResponseEntity<StandardError> amazonClient(AmazonClientException e, HttpServletRequest request) {
//		
//		StandardError err = new StandardError(System.currentTimeMillis(), HttpStatus.BAD_REQUEST.value(), "Erro Amazon Client", e.getMessage(), request.getRequestURI());
//		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(err);
//	}
//
//	@ExceptionHandler(AmazonS3Exception.class)
//	public ResponseEntity<StandardError> amazonS3(AmazonS3Exception e, HttpServletRequest request) {
//		
//		StandardError err = new StandardError(System.currentTimeMillis(), HttpStatus.BAD_REQUEST.value(), "Erro S3", e.getMessage(), request.getRequestURI());
//		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(err);
//	}

}
