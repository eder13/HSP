package com.springreact.template;

import com.springreact.template.db.UploadRepository;
import com.springreact.template.security.UploadValidator;
import io.github.cdimascio.dotenv.Dotenv;
import io.github.cdimascio.dotenv.DotenvEntry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.core.env.MapPropertySource;
import org.springframework.core.env.MutablePropertySources;
import org.springframework.core.env.StandardEnvironment;
import org.springframework.data.rest.core.event.ValidatingRepositoryEventListener;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;

import java.util.Map;
import java.util.stream.Collectors;

@SpringBootApplication
public class SpringReactOAuthApplication implements RepositoryRestConfigurer {

	private final UploadRepository uploadRepository;

	public SpringReactOAuthApplication(UploadRepository uploadRepository) {
		this.uploadRepository = uploadRepository;
	}

	public static void main(String[] args) {

		Map<String, Object> env = Dotenv.load()
				.entries()
				.stream()
				.collect(
						Collectors.toMap(DotenvEntry::getKey, DotenvEntry::getValue));
		new SpringApplicationBuilder(SpringReactOAuthApplication.class)
				.environment(new StandardEnvironment() {
					@Override
					protected void customizePropertySources(MutablePropertySources propertySources) {
						super.customizePropertySources(propertySources);
						propertySources.addLast(new MapPropertySource("dotenvProperties", env));
					}
				}).run(args);
	}

	@Override
	public void configureValidatingRepositoryEventListener(
			ValidatingRepositoryEventListener v) {
		v.addValidator("beforeSave", new UploadValidator(this.uploadRepository));
	}
}
