package api.animal;

import lombok.Value;

@Value
public class AnimalReminderRequest {
	
	String reminder;
	String dateEntered;
	String dateDue;

}
