package api.animal;

import java.util.List;

import domain.animal.Animal;
import lombok.Value;

@Value
public class AnimalListResponse {
	List<Animal> animals;
}
