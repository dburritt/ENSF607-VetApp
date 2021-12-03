package domain.animal;

import java.sql.Date;

import domain.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.Value;

@Value
@Builder
public class AnimalRequest {
	private String requestId;
	private String animalId;
	private String userId;
	private String currentState;
	
	
}
