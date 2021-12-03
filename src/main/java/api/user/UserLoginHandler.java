package api.user;

import api.*;
import api.animal.AnimalListResponse;
import errors.ApplicationExceptions;
import errors.GlobalExceptionHandler;
import domain.user.NewUser;
import domain.user.User;
import domain.user.UserService;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.net.httpserver.HttpExchange;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.List;
import java.util.Map;

public class UserLoginHandler extends Handler {

    private final UserService userService;

    public UserLoginHandler(UserService userService, ObjectMapper objectMapper,
                                   GlobalExceptionHandler exceptionHandler) {
        super(objectMapper, exceptionHandler);
        this.userService = userService;
    }

    @Override
    protected void execute(HttpExchange exchange) throws IOException {
        byte[] response=null;
        if ("POST".equals(exchange.getRequestMethod())) {

            ResponseEntity e = doPost(exchange);
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

    private ResponseEntity<UserListResponse> doPost(HttpExchange exchange) {
        //UserListResponse UserListResponse=new UserListResponse(userService.getUsers());
        //return new ResponseEntity<>(UserListResponse,
         //       getHeaders(Constants.CONTENT_TYPE, Constants.APPLICATION_JSON), StatusCode.OK);
        
    	Map<String, List<String>> params = ApiUtils.splitQuery(exchange.getRequestURI().getRawQuery());
        String userId = params.getOrDefault("id", List.of("")).stream().findFirst().orElse("");
        RegistrationRequest registerRequest = super.readRequest(exchange.getRequestBody(), RegistrationRequest.class);
        UserListResponse user = new UserListResponse(userService.verifyUser(registerRequest));
        
        return new ResponseEntity<>(user,getHeaders(Constants.CONTENT_TYPE, Constants.APPLICATION_JSON), StatusCode.OK);


    }

   

}
