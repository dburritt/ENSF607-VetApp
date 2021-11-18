package domain.admin;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class Email {
	String email;
	String name;

}
