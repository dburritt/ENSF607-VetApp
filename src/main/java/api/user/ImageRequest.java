package api.user;

import java.sql.Date;

import lombok.Builder;
import lombok.Value;

@Builder
@Value
public class ImageRequest {
	
	String imageId;
	String imageLocation;
	String userId;
	String animalId;
	Date creationDate;

}