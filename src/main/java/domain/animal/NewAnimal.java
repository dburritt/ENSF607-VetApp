package domain.animal;

import lombok.Builder;
import lombok.Value;

@Builder
@Value
public class NewAnimal {
	String type;
	double weight;
	String breed;
	String color;
}
