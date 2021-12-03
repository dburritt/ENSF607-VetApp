package domain.user;

import java.sql.Date;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class NewUser {
	 	String username;
	    String password;
	    String accountType;
	    Date activationDate;
	    String fName;
	    String lName;
	    String email;
}
