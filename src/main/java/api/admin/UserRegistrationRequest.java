package api.admin;

import lombok.Value;

@Value
public class UserRegistrationRequest {

    String login;
    String password;
	
}
