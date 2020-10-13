package com.example.demo.config;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.RequestMethod;

import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.builders.ResponseMessageBuilder;
import springfox.documentation.schema.ModelRef;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.service.Header;
import springfox.documentation.service.ResponseMessage;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

//http://localhost:8080/swagger-ui.html

@Configuration
@EnableSwagger2
public class SwaggerConfig {

	private final ResponseMessage m201 = customMessage1();
	private final ResponseMessage m204put = simpleMessage(201, "Atualização ok");
	private final ResponseMessage m204del = simpleMessage(201, "Deleção ok");
	
	@Bean
	public Docket api() {
		return new Docket(DocumentationType.SWAGGER_12)
			    .useDefaultResponseMessages(false)
			    .globalResponseMessage(RequestMethod.POST, Arrays.asList(m201))
			    .globalResponseMessage(RequestMethod.PUT, Arrays.asList(m204put))
			    .globalResponseMessage(RequestMethod.DELETE, Arrays.asList(m204del))
				.select()
				.apis(RequestHandlerSelectors.basePackage("com.example.demo.resources"))
				.paths(PathSelectors.any())
				.build()
				.apiInfo(apiInfo());
	}
	
	private ApiInfo apiInfo() {
		return new ApiInfo("API do curso Spring Boot",
				"Esta API é utilizada no curso de Spring Boot do prof. Nelio Alves",
				"Versão 1.0",
				"https://www.udemy.com/terms",
				new Contact("Nelio Alves", "udemy.com/user/nelio-alves", "nelio.cursos@gmail.com"),
				"Permitido uso para estudantes",
				"https://www.udemy.com/terms",
				Collections.emptyList());
	}
	
	private ResponseMessage simpleMessage(int code, String msg) {
		return new ResponseMessageBuilder().code(code).message(msg).build();
	}
	
	private ResponseMessage  customMessage1() {
		
		Map<String, Header> map = new HashMap<>();
		map.put("location", new Header("location", "URI do novo recurso", new ModelRef("string")));
		
		return new ResponseMessageBuilder()
				.code(201)
				.message("Recurso criado")
				.headersWithDescription(map)
				.build();
		
	}
	
}
