package domain.animal;

import java.sql.Date;

import lombok.Builder;
import lombok.Getter;
import lombok.Value;

@Value
@Getter
@Builder

public class NewAnimalHealthRecord {
	Date date;
	String type;
    String record;	
    String notes;
}
