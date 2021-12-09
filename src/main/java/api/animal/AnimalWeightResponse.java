package api.animal;
import java.util.List;

import domain.animal.AnimalWeight;
import lombok.Value;

@Value
public class AnimalWeightResponse {
	List<AnimalWeight> animalWeight;
}
