package api.user;

import api.*;
import errors.ApplicationExceptions;
import errors.GlobalExceptionHandler;
import domain.user.NewAdmin;
import domain.user.Admin;
import domain.user.AdminService;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.net.httpserver.HttpExchange;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.List;
import java.util.Map;

public class AdminRegistrationHandler extends Handler {
	
	private final AdminService adminService;

    public AdminRegistrationHandler(AdminService adminService, ObjectMapper objectMapper,
                                   GlobalExceptionHandler exceptionHandler) {
        super(objectMapper, exceptionHandler);
        this.adminService = adminService;
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
        } else {
            throw ApplicationExceptions.methodNotAllowed(
                    "Method " + exchange.getRequestMethod() + " is not allowed for " + exchange.getRequestURI()).get();
        }


        OutputStream os = exchange.getResponseBody();
        os.write(response);
        os.close();

    }

    private ResponseEntity<RegistrationResponse> doPost(InputStream is) {
        RegistrationRequest registerRequest = super.readRequest(is, RegistrationRequest.class);

        NewAdmin admin = NewAdmin.builder()
                .login(registerRequest.getUsername())
                .password(registerRequest.getPassword())
                .build();

        String adminId = adminService.create(admin);

        RegistrationResponse response = new RegistrationResponse(adminId);

        return new ResponseEntity<>(response,
                getHeaders(Constants.CONTENT_TYPE, Constants.APPLICATION_JSON), StatusCode.OK);
    }

    private ResponseEntity<AdminListResponse> doGet(HttpExchange exchange) {

        //AdminListResponse AdminListResponse = new AdminListResponse(adminService.getAdmin());
        //return new ResponseEntity<>(AdminListResponse,
        //       getHeaders(Constants.CONTENT_TYPE, Constants.APPLICATION_JSON), StatusCode.OK);

        Map<String, List<String>> params = ApiUtils.splitQuery(exchange.getRequestURI().getRawQuery());
        String noId= "";
        String id = params.getOrDefault("id", List.of(noId)).stream().findFirst().orElse(noId);
        AdminListResponse response;
        if (id.equals(noId)) {
        	response = new AdminListResponse(adminService.getAdmin());
        }
        else
        	response = new AdminListResponse(adminService.getAdmin(id));
        
		return new ResponseEntity<AdminListResponse>(response, getHeaders(Constants.CONTENT_TYPE, Constants.APPLICATION_JSON), StatusCode.OK);
    }

    private ResponseEntity<Admin> doPut(HttpExchange exchange) {

        Map<String, List<String>> params = ApiUtils.splitQuery(exchange.getRequestURI().getRawQuery());
        String adminId = params.getOrDefault("id", List.of("")).stream().findFirst().orElse("");
        RegistrationRequest registerRequest = super.readRequest(exchange.getRequestBody(), RegistrationRequest.class);
        Admin adminForUpdate = Admin.builder().id(adminId).login(registerRequest.getUsername()).password(registerRequest.getPassword()).build();
        Admin adminAfterUpdate = adminService.updateAdmin(adminForUpdate);
        return new ResponseEntity<>(adminAfterUpdate,
                getHeaders(Constants.CONTENT_TYPE, Constants.APPLICATION_JSON), StatusCode.OK);

    }

    private ResponseEntity<String> doDelete(HttpExchange exchange) {
        Map<String, List<String>> params = ApiUtils.splitQuery(exchange.getRequestURI().getRawQuery());
        String adminId = params.getOrDefault("id", List.of("")).stream().findFirst().orElse(null);
        adminService.deleteAdmin(adminId);
       return new ResponseEntity<>("Administrator successfully deleted",
                getHeaders(Constants.CONTENT_TYPE, Constants.PLAIN_TXT), StatusCode.OK);
    }

}
