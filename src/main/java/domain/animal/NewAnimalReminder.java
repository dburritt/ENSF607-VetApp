package domain.animal;

import java.sql.Timestamp;

import lombok.Builder;
import lombok.Getter;
import lombok.Value;

@Value
@Getter
@Builder
public class NewAnimalReminder {
	String text;
	Timestamp creationDate;
	Timestamp dueDate;
	String userId;
	String animalId;
}
