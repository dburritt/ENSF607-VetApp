package domain.user;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class Admin {
	String id;
    String login;
    String password;
}
