package api.animal;
import java.io.InputStream;
import java.io.OutputStream;
import java.sql.Timestamp;
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
import domain.animal.AnimalWeight;
import domain.animal.NewAnimalDetails;
import domain.animal.NewAnimalWeight;
import domain.animal.AnimalService;
import errors.ApplicationExceptions;
import errors.GlobalExceptionHandler;

public class AnimalWeightHandler extends Handler {
	private final AnimalService animalService;

	public AnimalWeightHandler(AnimalService animalService, ObjectMapper objectMapper, GlobalExceptionHandler exceptionHandler) {
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
		} else if ("DELETE".equals(exchange.getRequestMethod())) {
			ResponseEntity e = doDelete(exchange);
			exchange.getResponseHeaders().putAll(e.getHeaders());
			exchange.sendResponseHeaders(e.getStatusCode().getCode(), 0);
			response = super.writeResponse(e.getBody());
		} else if ("OPTIONS".equals(exchange.getRequestMethod())) {
			ResponseEntity e = new ResponseEntity<>("ok",
					getHeaders(Constants.CONTENT_TYPE, Constants.APPLICATION_JSON), StatusCode.OK);
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

	private ResponseEntity<AnimalWeight> doPut(HttpExchange exchange) {
		Map<String, List<String>> params = ApiUtils.splitQuery(exchange.getRequestURI().getRawQuery());
        String animalId = params.getOrDefault("id", List.of("")).stream().findFirst().orElse("");
        NewAnimalWeight newAnimalWeight = super.readRequest(exchange.getRequestBody(), NewAnimalWeight.class);
        AnimalWeight animalWeightForUpdate = AnimalWeight.builder()
                .animalId(animalId)
                .weight(newAnimalWeight.getWeight())
                .build();
        AnimalWeight animalWeightAfterUpdate = animalService.updateAnimalWeight(animalWeightForUpdate);
        return new ResponseEntity<>(animalWeightAfterUpdate,
                getHeaders(Constants.CONTENT_TYPE, Constants.APPLICATION_JSON), StatusCode.OK);
	}

	private ResponseEntity<String> doPost(HttpExchange exchange) {
		Map<String, List<String>> params = ApiUtils.splitQuery(exchange.getRequestURI().getRawQuery());
        String animalId = params.getOrDefault("id", List.of("")).stream().findFirst().orElse("");
        NewAnimalWeight newAnimalWeight = super.readRequest(exchange.getRequestBody(), NewAnimalWeight.class);
        Timestamp date = newAnimalWeight.getDate();
        System.out.println(newAnimalWeight.getDate()); 
        AnimalWeight animalWeight = AnimalWeight.builder()
                .animalId(animalId)
                .weight(newAnimalWeight.getWeight())
                .date(new java.sql.Timestamp((new java.util.Date()).getTime()))
                .notes(newAnimalWeight.getNotes())
                .build();
        animalService.createAnimalWeight(animalWeight);
        return new ResponseEntity<>(animalId,
                getHeaders(Constants.CONTENT_TYPE, Constants.APPLICATION_JSON), StatusCode.OK);
	}

	private ResponseEntity<AnimalWeightResponse> doGet(HttpExchange exchange) {
		Map<String, List<String>> params = ApiUtils.splitQuery(exchange.getRequestURI().getRawQuery());
        String noId= "";
        String id = params.getOrDefault("id", List.of(noId)).stream().findFirst().orElse(noId);
        
        AnimalWeightResponse animalWeightResponse = new AnimalWeightResponse(animalService.getAnimalWeight(id));
        
		return new ResponseEntity<>(animalWeightResponse, getHeaders(Constants.CONTENT_TYPE, Constants.APPLICATION_JSON), StatusCode.OK);
	}
	private ResponseEntity<String> doDelete(HttpExchange exchange) {
		Map<String, List<String>> params = ApiUtils.splitQuery(exchange.getRequestURI().getRawQuery());
		String deleteAnimalId = params.getOrDefault("id", List.of("")).stream().findFirst().orElse(null);
		String deleteTime = params.getOrDefault("time", List.of("")).stream().findFirst().orElse(null);
		animalService.deleteWeight(deleteAnimalId,deleteTime);
		return new ResponseEntity<>("Comment successfully deleted",
				getHeaders(Constants.CONTENT_TYPE, Constants.PLAIN_TXT), StatusCode.OK);
	}
}

