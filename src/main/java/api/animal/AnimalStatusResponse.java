package api.animal;

import domain.animal.AnimalStatus;
import lombok.Value;

@Value
public class AnimalStatusResponse {
	AnimalStatus animalStatus;
}
