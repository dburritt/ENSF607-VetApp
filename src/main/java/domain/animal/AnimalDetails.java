package domain.animal;

import lombok.Builder;
import lombok.Getter;
import lombok.Value;

@Value
@Getter
@Builder

public class AnimalDetails {
	String id;
	String tattoo;
	String RFID;
    String DOB;	
}
