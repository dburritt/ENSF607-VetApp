package api.user;

import lombok.Value;

@Value
public class RegistrationRequest {
	
	String username;
    String password;
}
