package domain.animal;
import java.sql.Timestamp;
import java.util.Date;
import java.util.TreeMap;
import lombok.Builder;
import lombok.Getter;
import lombok.Value;

@Value
@Getter
@Builder
public class NewAnimalWeight {
	Timestamp date;
	double weight;
	String notes;
}
