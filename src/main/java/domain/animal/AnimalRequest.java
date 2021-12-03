package domain.animal;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class AnimalRequest {
	private String requestId;
	private String animalId;
	private String userId;
	private String currentState = "requested";
	
	public void nextState() {
		/*String 
		switch(currentState) {
		  case "requested":
		    nextState
		    break;
		  case y:
		    // code block
		    break;
		  default:
		    // code block
		}
		*/
	}
}
