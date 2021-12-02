package api.admin;

import java.sql.Date;

import lombok.Builder;
import lombok.Value;

@Builder
@Value
public class CommentRequest {
	
	String userId;
	String animalId;
	String commentDate;
	String commentText;

}
