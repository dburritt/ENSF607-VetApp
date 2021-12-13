package api.animal;

import java.sql.Timestamp;

import lombok.Value;

@Value
public class AnimalReminderRequest {
	String text;
	Timestamp creationDate;
	Timestamp dueDate;
	String userId;
	String animalId;

}
