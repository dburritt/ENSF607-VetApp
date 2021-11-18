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
import domain.animal.AnimalService;
import errors.ApplicationExceptions;
import errors.GlobalExceptionHandler;

public class AnimalStatusHandler extends Handler {
	private final AnimalService animalService;

	public AnimalStatusHandler(AnimalService animalService, ObjectMapper objectMapper, GlobalExceptionHandler exceptionHandler) {
		super(objectMapper, exceptionHandler);
		this.animalService = animalService;
		
	}

	@Override
	protected void execute(HttpExchange exchange) throws Exception {
		byte[] response=null;
		if ("POST".equals(exchange.getRequestMethod())) {
            ResponseEntity e = doPost(exchange.getRequestBody());
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
		} else {
        throw ApplicationExceptions.methodNotAllowed(
                "Method " + exchange.getRequestMethod() + " is not allowed for " + exchange.getRequestURI()).get();
		}
		OutputStream os = exchange.getResponseBody();
        os.write(response);
        os.close();
	}

	private ResponseEntity doPut(HttpExchange exchange) {
		// TODO Auto-generated method stub
		return null;
	}

	private ResponseEntity doPost(InputStream requestBody) {
		// TODO Auto-generated method stub
		return null;
	}

	private ResponseEntity<AnimalDetailsResponse> doGet(HttpExchange exchange) {
		Map<String, List<String>> params = ApiUtils.splitQuery(exchange.getRequestURI().getRawQuery());
        String noId= "";
        String id = params.getOrDefault("id", List.of(noId)).stream().findFirst().orElse(noId);
        
        AnimalDetailsResponse animalDetailsResponse = new AnimalDetailsResponse(animalService.getAnimalDetails(id));
        
		return new ResponseEntity<>(animalDetailsResponse, getHeaders(Constants.CONTENT_TYPE, Constants.APPLICATION_JSON), StatusCode.OK);
	}
	
}

