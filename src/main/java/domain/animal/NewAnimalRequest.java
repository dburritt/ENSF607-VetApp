package domain.animal;

import lombok.Value;

@Value
public class NewAnimalRequest {
		
	private String animalId;
	private String userId;
	private String state = "requested";
	
}
