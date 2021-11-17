package domain.animal;

import lombok.Builder;
import lombok.Getter;
import lombok.Value;

@Value
@Getter
@Builder
public class Animal {

    String id;
    String type;
    double weight;
    String breed;
    String color;
    
}