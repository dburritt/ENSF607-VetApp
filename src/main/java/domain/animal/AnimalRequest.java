package domain.animal;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class AnimalRequest {
	private String requestId;
	private String animalId;
	private String userId;
	private String state;
}
