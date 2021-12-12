package api.animal;
import java.io.InputStream;
import java.io.OutputStream;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.net.httpserver.HttpExchange;

import api.ApiUtils;
import api.Constants;
import api.Handler;
import api.ResponseEntity;
import api.StatusCode;
import domain.animal.Animal;
import domain.animal.AnimalDetails;
import domain.animal.AnimalHealthRecord;
import domain.animal.AnimalService;
import domain.animal.NewAnimal;
import domain.animal.NewAnimalDetails;
import domain.animal.NewAnimalHealthRecord;
import errors.ApplicationExceptions;
import errors.GlobalExceptionHandler;

public class AnimalHealthRecordHandler extends Handler {
	private final AnimalService animalService;

	public AnimalHealthRecordHandler(AnimalService animalService, ObjectMapper objectMapper, GlobalExceptionHandler exceptionHandler) {
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
        String animalId = params.getOrDefault("id", List.of("")).stream().findFirst().orElse("");
        NewAnimalHealthRecord newAnimalHealthRecord = super.readRequest(exchange.getRequestBody(), NewAnimalHealthRecord.class);
        AnimalHealthRecord animalHealthRecordForUpdate = AnimalHealthRecord.builder()
                .animalId(animalId)
                .date(new java.sql.Timestamp((new java.util.Date()).getTime()))
                .type(newAnimalHealthRecord.getType())
                .record(newAnimalHealthRecord.getRecord())
                .build();
        AnimalHealthRecord animalHealthRecordAfterUpdate = animalService.updateAnimalHealthRecord(animalHealthRecordForUpdate);
        return new ResponseEntity<>(animalHealthRecordAfterUpdate,
                getHeaders(Constants.CONTENT_TYPE, Constants.APPLICATION_JSON), StatusCode.OK);
	}

	private ResponseEntity doPost(HttpExchange exchange) {
		Map<String, List<String>> params = ApiUtils.splitQuery(exchange.getRequestURI().getRawQuery());
        String animalId = params.getOrDefault("id", List.of("")).stream().findFirst().orElse("");
        NewAnimalHealthRecord newAnimalHealthRecord = super.readRequest(exchange.getRequestBody(), NewAnimalHealthRecord.class);
        AnimalHealthRecord animalHealthRecord = AnimalHealthRecord.builder()
        		.animalId(animalId)
                .date(new java.sql.Timestamp((new java.util.Date()).getTime()))
                .type(newAnimalHealthRecord.getType())
                .record(newAnimalHealthRecord.getRecord())
                .notes(newAnimalHealthRecord.getNotes())
                .build();
        animalService.createAnimalHealthRecord(animalHealthRecord);
        return new ResponseEntity<>(animalId,
                getHeaders(Constants.CONTENT_TYPE, Constants.APPLICATION_JSON), StatusCode.OK);
	}

	private ResponseEntity<List<AnimalHealthRecord>> doGet(HttpExchange exchange) {
		Map<String, List<String>> params = ApiUtils.splitQuery(exchange.getRequestURI().getRawQuery());
        String noId= "";
        String id = params.getOrDefault("id", List.of(noId)).stream().findFirst().orElse(noId);
        
        List<AnimalHealthRecord> animalHealthRecordResponse = animalService.getAnimalHealthRecord(id);
        
		return new ResponseEntity<>(animalHealthRecordResponse, getHeaders(Constants.CONTENT_TYPE, Constants.APPLICATION_JSON), StatusCode.OK);
	}
	private ResponseEntity<String> doDelete(HttpExchange exchange) {
		Map<String, List<String>> params = ApiUtils.splitQuery(exchange.getRequestURI().getRawQuery());
		String deleteAnimalId = params.getOrDefault("id", List.of("")).stream().findFirst().orElse(null);
		String deleteTime = params.getOrDefault("time", List.of("")).stream().findFirst().orElse(null);
		animalService.deleteAnimalHealthRecord(deleteAnimalId,deleteTime);
		return new ResponseEntity<>("Record successfully deleted",
				getHeaders(Constants.CONTENT_TYPE, Constants.PLAIN_TXT), StatusCode.OK);
	}
	
}

