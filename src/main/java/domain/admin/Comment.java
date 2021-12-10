package domain.admin;

import lombok.Builder;
import lombok.Value;
import java.sql.Date;
import java.sql.Timestamp;

@Value
@Builder
public class Comment {
	String commentId;
	String userId;
	String animalId;
	Timestamp commentDate;
	String commentText;

}