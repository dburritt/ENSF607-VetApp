package domain.animal;
import java.util.Date;
import java.util.TreeMap;
import lombok.Builder;
import lombok.Getter;
import lombok.Value;

@Value
@Getter
@Builder
public class AnimalWeight {
	String id;
	TreeMap<Date, Double> weight;
}
