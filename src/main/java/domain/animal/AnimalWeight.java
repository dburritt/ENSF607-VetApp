package domain.animal;
import java.util.Date;
import java.util.TreeMap;

import java.sql.Timestamp;

import lombok.Builder;
import lombok.Getter;
import lombok.Value;

@Value
@Getter
@Builder
public class AnimalWeight {
	String animalId;
	Timestamp date;
	double weight;
	String notes;
}
