package api.animal;

import java.io.InputStream;
import java.io.OutputStream;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.net.httpserver.HttpExchange;

import api.Handler;
import api.ResponseEntity;
import api.StatusCode;
import api.user.PasswordEncoder;
import domain.animal.Animal;
import errors.ApplicationExceptions;
import errors.GlobalExceptionHandler;
import domain.animal.AnimalService;
import domain.animal.NewAnimal;
import domain.user.Admin;
import domain.user.NewUser;
import api.ApiUtils;
import api.Constants;

public class AnimalSearchHandler extends Handler {
    	private final AnimalService animalService;


		public AnimalSearchHandler(AnimalService animalService, ObjectMapper objectMapper, GlobalExceptionHandler exceptionHandler) {
			super(objectMapper, exceptionHandler);
			this.animalService = animalService;
		}

		@Override
		protected void execute(HttpExchange exchange) throws Exception {
			byte[] response=null;
			if ("GET".equals(exchange.getRequestMethod())) {
				  ResponseEntity e = doGet(exchange);
		           exchange.getResponseHeaders().putAll(e.getHeaders());
		           exchange.sendResponseHeaders(e.getStatusCode().getCode(), 0);
		           response = super.writeResponse(e.getBody());
			} else {
	        throw ApplicationExceptions.methodNotAllowed(
	                "Method " + exchange.getRequestMethod() + " is not allowed for " + exchange.getRequestURI()).get();
			}
			OutputStream os = exchange.getResponseBody();
	        os.write(response);
	        os.close();
			
		}
		private ResponseEntity<AnimalListResponse> doGet(HttpExchange exchange) {
			Map<String, List<String>> params = ApiUtils.splitQuery(exchange.getRequestURI().getRawQuery());
            String noId= "";
            String search = params.getOrDefault("key", List.of(noId)).stream().findFirst().orElse("");
            System.out.println(search);
            AnimalListResponse animalListResponse = null;
            
            if (search.equals("")) {
            	animalListResponse = new AnimalListResponse(animalService.getAnimals());
            }
             
            if (!search.equals("")) {
            	animalListResponse = new AnimalListResponse(animalService.getAnimalsSearch(search));
            }
            
       
			return new ResponseEntity<AnimalListResponse>(animalListResponse, getHeaders(Constants.CONTENT_TYPE, Constants.APPLICATION_JSON), StatusCode.OK);
		}
		
}

