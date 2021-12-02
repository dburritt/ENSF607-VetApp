package domain.admin;

import lombok.Builder;
import lombok.Value;
import java.sql.Date;

@Value
@Builder
public class Comment {
	String commentId;
	String userId;
	String animalId;
	String commentDate;
	String commentText;

}