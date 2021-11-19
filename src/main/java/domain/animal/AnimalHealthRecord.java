package domain.animal;

import java.util.Date;

import lombok.Builder;
import lombok.Getter;
import lombok.Value;

@Value
@Getter
@Builder

public class AnimalHealthRecord {
	String animalId;
	Date date;
	String type;
    String record;	
}
