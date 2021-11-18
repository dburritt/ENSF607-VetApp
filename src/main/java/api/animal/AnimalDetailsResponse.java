package api.animal;

import java.util.List;

import domain.animal.AnimalDetails;
import lombok.Value;

@Value
public class AnimalDetailsResponse {
	List<AnimalDetails> animalDetails;
}
