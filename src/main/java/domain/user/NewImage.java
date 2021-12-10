package domain.user;

import java.sql.Date;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class NewImage {
	byte[] imageData;
	String imageId;
    Date creationDate;
    String userId;
    String animalId;
}
