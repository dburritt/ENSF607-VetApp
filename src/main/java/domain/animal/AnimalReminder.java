package domain.animal;

import lombok.Builder;
import lombok.Getter;
import lombok.Value;

@Value
@Getter
@Builder
public class AnimalReminder {
	String animalId;
	String reminder;
	String dateEntered;
	String dateDue;
}
