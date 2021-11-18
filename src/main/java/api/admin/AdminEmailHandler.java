package api.admin;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.net.httpserver.HttpExchange;

import api.*;
import domain.admin.*;
import errors.*;

public class AdminEmailHandler extends Handler {

    private final AdminMailingService adminMailingService;

    public AdminEmailHandler(AdminMailingService adminMailingService, ObjectMapper objectMapper,
                                   GlobalExceptionHandler exceptionHandler) {
        super(objectMapper, exceptionHandler);
        this.adminMailingService = adminMailingService;
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

            ResponseEntity e = doGet();
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
        } else {
            throw ApplicationExceptions.methodNotAllowed(
                    "Method " + exchange.getRequestMethod() + " is not allowed for " + exchange.getRequestURI()).get();
        }


        OutputStream os = exchange.getResponseBody();
        os.write(response);
        os.close();

    }

    private ResponseEntity<EmailRegistrationResponse> doPost(InputStream is) {
    	EmailRegistrationRequest emailRegisterRequest = super.readRequest(is, EmailRegistrationRequest.class);

        Email email = Email.builder()
                .email(emailRegisterRequest.getEmail())
                .name(emailRegisterRequest.getName())
                .build();

        String newEmail = adminMailingService.create(email);

        EmailRegistrationResponse response = new EmailRegistrationResponse(newEmail);

        return new ResponseEntity<>(response,
                getHeaders(Constants.CONTENT_TYPE, Constants.APPLICATION_JSON), StatusCode.OK);
    }

    private ResponseEntity<EmailListResponse> doGet() {

             EmailListResponse emailListResponse=new EmailListResponse(adminMailingService.getEmails());
        return new ResponseEntity<>(emailListResponse,
                getHeaders(Constants.CONTENT_TYPE, Constants.APPLICATION_JSON), StatusCode.OK);

    }

    private ResponseEntity<Email> doPut(HttpExchange exchange) {

        Map<String, List<String>> params = ApiUtils.splitQuery(exchange.getRequestURI().getRawQuery());
        String email = params.getOrDefault("email", List.of("")).stream().findFirst().orElse("");
        EmailRegistrationRequest emailRegisterRequest = super.readRequest(exchange.getRequestBody(), EmailRegistrationRequest.class);
        Email emailForUpdate=Email.builder().email(email).name(emailRegisterRequest.getName()).build();
        Email emailAfterUpdate= adminMailingService.updateEmail(emailForUpdate);
        return new ResponseEntity<>(emailAfterUpdate,
                getHeaders(Constants.CONTENT_TYPE, Constants.APPLICATION_JSON), StatusCode.OK);

    }

    private ResponseEntity<String> doDelete(HttpExchange exchange) {
        Map<String, List<String>> params = ApiUtils.splitQuery(exchange.getRequestURI().getRawQuery());
        String email = params.getOrDefault("email", List.of("")).stream().findFirst().orElse(null);
        adminMailingService.deleteEmail(email);
       return new ResponseEntity<>("User successfully deleted",
                getHeaders(Constants.CONTENT_TYPE, Constants.PLAIN_TXT), StatusCode.OK);
    }

}
