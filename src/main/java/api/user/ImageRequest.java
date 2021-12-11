package api.user;

import java.sql.Timestamp;

import lombok.Builder;
import lombok.Value;

@Builder
@Value
public class ImageRequest {
	
	String imageId;
	String imageLocation;
	String userId;
	String animalId;
	Timestamp creationDate;

}