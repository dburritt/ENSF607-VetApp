package domain.animal;

import java.sql.Date;
import java.util.Map;

import lombok.Builder;
import lombok.Getter;
import lombok.Value;

@Value
@Getter
@Builder
public class Animal {

    String id;
    String name;
    String species;
    String subspecies;
    String breed;
    String sex;
    String color;
    String features;
    Date bithdate;
    String rfid;
    String microchip;
    String tattooNum;
    	
}