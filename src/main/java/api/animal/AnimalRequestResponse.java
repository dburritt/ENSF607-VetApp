package api.animal;
import java.util.List;

import domain.animal.AnimalRequest;
import lombok.Value;

@Value
public class AnimalRequestResponse {

	List<AnimalRequest> animalRequests;

}
