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

public class AnimalsAvailableHandler extends Handler {
    	private final AnimalService animalService;


		public AnimalsAvailableHandler(AnimalService animalService, ObjectMapper objectMapper, GlobalExceptionHandler exceptionHandler) {
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
            String id = params.getOrDefault("id", List.of(noId)).stream().findFirst().orElse(noId);
            AnimalListResponse animalListResponse;
            if (id.equals(noId)) {
            	animalListResponse = new AnimalListResponse(animalService.getAvailableAnimals());
            }
            else
            	animalListResponse = new AnimalListResponse(animalService.getAnimals(id));
            
			return new ResponseEntity<AnimalListResponse>(animalListResponse, getHeaders(Constants.CONTENT_TYPE, Constants.APPLICATION_JSON), StatusCode.OK);
		}
		
}

