package api.animal;

import java.util.List;

import domain.animal.AnimalReminder;
import lombok.Value;

@Value
public class AnimalReminderListResponse {

	List<AnimalReminder> animalReminders;
	
}
