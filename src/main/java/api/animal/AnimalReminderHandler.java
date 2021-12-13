package api.animal;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.net.httpserver.HttpExchange;

import api.*;
import api.admin.EmailListResponse;
import api.admin.EmailRegistrationRequest;
import api.admin.EmailRegistrationResponse;
import domain.admin.Email;
import domain.animal.AnimalReminder;
import domain.animal.AnimalService;
import domain.animal.NewAnimalReminder;
import errors.*;

public class AnimalReminderHandler extends Handler{

	private final AnimalService animalService;

	public AnimalReminderHandler(AnimalService animalService, ObjectMapper objectMapper,
			GlobalExceptionHandler exceptionHandler) {
		super(objectMapper, exceptionHandler);
		this.animalService = animalService;
	}

	@Override
	protected void execute(HttpExchange exchange) throws IOException {
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
		}  else {
			throw ApplicationExceptions.methodNotAllowed(
					"Method " + exchange.getRequestMethod() + " is not allowed for " + exchange.getRequestURI()).get();
		}


		OutputStream os = exchange.getResponseBody();
		os.write(response);
		os.close();

	}

	private ResponseEntity<AnimalReminderResponse> doPost(InputStream is) {

		AnimalReminderRequest animalReminderRequest = super.readRequest(is, AnimalReminderRequest.class);

		NewAnimalReminder newReminder = NewAnimalReminder.builder()
				.text(animalReminderRequest.getText())
				.dueDate(animalReminderRequest.getDueDate())
				.creationDate(animalReminderRequest.getCreationDate())
				.userId(animalReminderRequest.getUserId())
				.animalId(animalReminderRequest.getAnimalId())
				.build();

		String reminder = animalService.createAnimalReminder(newReminder);

		AnimalReminderResponse response = new AnimalReminderResponse(reminder);

		return new ResponseEntity<>(response,
				getHeaders(Constants.CONTENT_TYPE, Constants.APPLICATION_JSON), StatusCode.OK);
	}

	private ResponseEntity<AnimalReminderListResponse> doGet(HttpExchange exchange) {
		
		Map<String, List<String>> params = ApiUtils.splitQuery(exchange.getRequestURI().getRawQuery());
		String animalId = params.getOrDefault("animalId", List.of("")).stream().findFirst().orElse("");

		AnimalReminderListResponse reminderListResponse = new AnimalReminderListResponse(animalService.getAnimalReminders(animalId));
		return new ResponseEntity<>(reminderListResponse,
				getHeaders(Constants.CONTENT_TYPE, Constants.APPLICATION_JSON), StatusCode.OK);
	}

	private ResponseEntity<AnimalReminder> doPut(HttpExchange exchange) {

		Map<String, List<String>> params = ApiUtils.splitQuery(exchange.getRequestURI().getRawQuery());
		String reminderId = params.getOrDefault("reminderId", List.of("")).stream().findFirst().orElse("");
		AnimalReminderRequest animalReminderRequest = super.readRequest(exchange.getRequestBody(), AnimalReminderRequest.class);
		AnimalReminder reminderForUpdate=AnimalReminder.builder()
				.reminderId(reminderId)
				.text(animalReminderRequest.getText())
				.creationDate(animalReminderRequest.getCreationDate())
				.dueDate(animalReminderRequest.getDueDate())
				.animalId(animalReminderRequest.getAnimalId())
				.userId(animalReminderRequest.getUserId())
				.build();
		AnimalReminder reminderAfterUpdate= animalService.updateAnimalReminder(reminderForUpdate);
		return new ResponseEntity<>(reminderAfterUpdate,
				getHeaders(Constants.CONTENT_TYPE, Constants.APPLICATION_JSON), StatusCode.OK);

	}

	private ResponseEntity<String> doDelete(HttpExchange exchange) {
		Map<String, List<String>> params = ApiUtils.splitQuery(exchange.getRequestURI().getRawQuery());
		String reminderId = params.getOrDefault("reminderId", List.of("")).stream().findFirst().orElse(null);
		animalService.deleteAnimalReminder(reminderId);
		return new ResponseEntity<>("Reminder successfully deleted",
				getHeaders(Constants.CONTENT_TYPE, Constants.PLAIN_TXT), StatusCode.OK);
	}

}
