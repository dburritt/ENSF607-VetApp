package api.animal;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.net.httpserver.HttpExchange;

import api.ApiUtils;
import api.Constants;
import api.Handler;
import api.ResponseEntity;
import api.StatusCode;
import domain.animal.Animal;
import domain.animal.AnimalDetails;
import domain.animal.AnimalRequest;
import domain.animal.AnimalService;
import domain.animal.NewAnimal;
import domain.animal.NewAnimalDetails;
import domain.animal.NewAnimalRequest;
import errors.ApplicationExceptions;
import errors.GlobalExceptionHandler;

public class AnimalRequestHandler extends Handler {
	private final AnimalService animalService;

	public AnimalRequestHandler(AnimalService animalService, ObjectMapper objectMapper, GlobalExceptionHandler exceptionHandler) {
		super(objectMapper, exceptionHandler);
		this.animalService = animalService;
		
	}

	@Override
	protected void execute(HttpExchange exchange) throws Exception {
		byte[] response=null;
		if ("POST".equals(exchange.getRequestMethod())) {
            ResponseEntity e = doPost(exchange);
            exchange.getResponseHeaders().putAll(e.getHeaders());
            exchange.sendResponseHeaders(e.getStatusCode().getCode(), 0);
            response = super.writeResponse(e.getBody());

        } else if ("GET".equals(exchange.getRequestMethod())) {
            ResponseEntity e = doGet(exchange);
            
            exchange.getResponseHeaders().putAll(e.getHeaders());
            exchange.sendResponseHeaders(e.getStatusCode().getCode(), 0);
            response = super.writeResponse(e.getBody());
            
		} else if ("PUT".equals(exchange.getRequestMethod())) {
	        ResponseEntity e = doPut(exchange);
	        exchange.getResponseHeaders().putAll(e.getHeaders());
	        exchange.sendResponseHeaders(e.getStatusCode().getCode(), 0);
	        response = super.writeResponse(e.getBody());
		} 
		else if ("OPTIONS".equals(exchange.getRequestMethod())) {
	        ResponseEntity e = new ResponseEntity<>("ok",
	                getHeaders(Constants.CONTENT_TYPE, Constants.APPLICATION_JSON), StatusCode.OK);
	        exchange.getResponseHeaders().putAll(e.getHeaders());
	        exchange.sendResponseHeaders(e.getStatusCode().getCode(), 0);
	        response = super.writeResponse(e.getBody());
		}else {
        throw ApplicationExceptions.methodNotAllowed(
                "Method " + exchange.getRequestMethod() + " is not allowed for " + exchange.getRequestURI()).get();
		}
		OutputStream os = exchange.getResponseBody();
        os.write(response);
        os.close();
	}

	private ResponseEntity doPut(HttpExchange exchange) {
		Map<String, List<String>> params = ApiUtils.splitQuery(exchange.getRequestURI().getRawQuery());
        String userId = params.getOrDefault("userid", List.of("")).stream().findFirst().orElse("");
        AnimalRequest animalRequest = super.readRequest(exchange.getRequestBody(), AnimalRequest.class);
        
        AnimalRequest animalDetailsAfterUpdate = animalService.updateAnimalRequest(userId, animalRequest);
        return new ResponseEntity<>(animalDetailsAfterUpdate,
                getHeaders(Constants.CONTENT_TYPE, Constants.APPLICATION_JSON), StatusCode.OK);
	}

	private ResponseEntity doPost(HttpExchange exchange) {
		Map<String, List<String>> params = ApiUtils.splitQuery(exchange.getRequestURI().getRawQuery());
		NewAnimalRequest newAnimalRequest = super.readRequest(exchange.getRequestBody(), NewAnimalRequest.class);
        String animalId = animalService.createAnimalRequest(newAnimalRequest);
        return new ResponseEntity<>(animalId,
                getHeaders(Constants.CONTENT_TYPE, Constants.APPLICATION_JSON), StatusCode.OK);
	}

	private ResponseEntity<AnimalRequestResponse> doGet(HttpExchange exchange) {
		Map<String, List<String>> params = ApiUtils.splitQuery(exchange.getRequestURI().getRawQuery());
        String noId= "";
        String userId = params.getOrDefault("userid", List.of(noId)).stream().findFirst().orElse(noId);
        String animalId = params.getOrDefault("userid", List.of(noId)).stream().findFirst().orElse(noId);
        AnimalRequestResponse animalRequestResponse;
        if (userId.equals(noId)) {
        	animalRequestResponse = new AnimalRequestResponse(animalService.getAnimalRequests());
        }
        else
        	animalRequestResponse = new AnimalRequestResponse(animalService.getAnimalRequestsUser(userId));
        
		return new ResponseEntity<>(animalRequestResponse, getHeaders(Constants.CONTENT_TYPE, Constants.APPLICATION_JSON), StatusCode.OK);
	}
	
}

