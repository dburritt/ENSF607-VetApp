package domain.animal;

import java.sql.Date;
import java.sql.Timestamp;

import lombok.Builder;
import lombok.Getter;
import lombok.Value;

@Value
@Getter
@Builder

public class NewAnimalHealthRecord {
	Timestamp date;
	String type;
    String record;	
    String notes;
}
