package domain.user;

import java.sql.Blob;
import java.sql.Timestamp;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class NewImage {
	String imageId;
	String imageLocation;
    Timestamp creationDate;
    String userId;
    String animalId;
    String imageData;
}
