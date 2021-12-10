package domain.user;

import java.sql.Date;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class Image {
	
	byte[] imageData;
	String imageId;
    Date creationDate;
    String userId;
    String animalId;
}

