package domain.animal;

import java.sql.Timestamp;
import java.util.Date;

import lombok.Builder;
import lombok.Getter;
import lombok.Value;

@Value
@Getter
@Builder

public class AnimalHealthRecord {
	String animalId;
	Timestamp date;
	String type;
    String record;	
    String notes;
}
