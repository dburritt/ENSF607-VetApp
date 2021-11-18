package domain.user;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class NewAdmin {
	String login;
    String password;
    String isAdmin;
}
