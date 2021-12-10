package api.admin;

import java.sql.Timestamp;

import lombok.Builder;
import lombok.Value;

@Builder
@Value
public class CommentRequest {
	
	String userId;
	String animalId;
	Timestamp commentDate;
	String commentText;

}
