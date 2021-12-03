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

    private ResponseEntity<RegistrationResponse> doPost(InputStream is) {
        RegistrationRequest registerRequest = super.readRequest(is, RegistrationRequest.class);

        NewUser user = NewUser.builder()
                .username(registerRequest.getUsername())
                .password(registerRequest.getPassword())
                .build();

        String userId = userService.create(user);

        RegistrationResponse response = new RegistrationResponse(userId);

        return new ResponseEntity<>(response,
                getHeaders(Constants.CONTENT_TYPE, Constants.APPLICATION_JSON), StatusCode.OK);
    }

    private ResponseEntity<UserListResponse> doGet(HttpExchange exchange) {
        //UserListResponse UserListResponse=new UserListResponse(userService.getUsers());
        //return new ResponseEntity<>(UserListResponse,
         //       getHeaders(Constants.CONTENT_TYPE, Constants.APPLICATION_JSON), StatusCode.OK);
        
    	Map<String, List<String>> params = ApiUtils.splitQuery(exchange.getRequestURI().getRawQuery());
        String userId = params.getOrDefault("id", List.of("")).stream().findFirst().orElse("");
        RegistrationRequest registerRequest = super.readRequest(exchange.getRequestBody(), RegistrationRequest.class);
        UserListResponse user = new UserListResponse(userService.verifyUser(registerRequest));
        
        return new ResponseEntity<>(user,getHeaders(Constants.CONTENT_TYPE, Constants.APPLICATION_JSON), StatusCode.OK);


    }

    private ResponseEntity<User> doPut(HttpExchange exchange) {

        Map<String, List<String>> params = ApiUtils.splitQuery(exchange.getRequestURI().getRawQuery());
        String userId = params.getOrDefault("id", List.of("")).stream().findFirst().orElse("");
        RegistrationRequest registerRequest = super.readRequest(exchange.getRequestBody(), RegistrationRequest.class);
        User userForUpdate=User.builder().id(userId).username(registerRequest.getUsername()).password(registerRequest.getPassword()).build();
        User userAfterUpdate= userService.updateUser(userForUpdate);
        return new ResponseEntity<>(userAfterUpdate,
                getHeaders(Constants.CONTENT_TYPE, Constants.APPLICATION_JSON), StatusCode.OK);

    }

    private ResponseEntity<String> doDelete(HttpExchange exchange) {
        Map<String, List<String>> params = ApiUtils.splitQuery(exchange.getRequestURI().getRawQuery());
        String userId = params.getOrDefault("id", List.of("")).stream().findFirst().orElse(null);
        userService.deleteUser(userId);
       return new ResponseEntity<>("User successfully deleted",
                getHeaders(Constants.CONTENT_TYPE, Constants.PLAIN_TXT), StatusCode.OK);
    }

}
