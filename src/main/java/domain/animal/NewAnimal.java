package domain.animal;

import java.sql.Date;

import lombok.Builder;
import lombok.Value;

@Builder
@Value
public class NewAnimal {
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
